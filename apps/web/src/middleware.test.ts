/**
 * @jest-environment node
 */
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import findEventCreatedBy from "~/actions/event/find-event-created-by";
import { auth } from "~/auth";
import envConfig from "~/constants/env-config";
import { middleware } from "~/middleware";

jest.mock("~/auth", () => ({ auth: jest.fn() }));
jest.mock("~/actions/event/find-event-created-by", () => jest.fn());
jest.mock("next/headers");

describe("middleware", () => {
	const origin = "https://example.com";

	it("redirects unauthenticated users to /oauth", async () => {
		(auth as jest.Mock).mockResolvedValue(null);

		const url = new URL("/dashboard", origin);
		const request = new NextRequest(url);

		const response = await middleware(request);

		expect(response).toEqual(NextResponse.redirect(origin + "/oauth"));
	});

	it("allows authenticated users to access protected routes", async () => {
		(auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });

		const url = new URL("/dashboard", origin);
		const request = new NextRequest(url);

		const response = await middleware(request);

		expect(response).toEqual(NextResponse.next());
	});

	it("redirects non-creators from /event/:code/edit", async () => {
		(auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });
		(findEventCreatedBy as jest.Mock).mockResolvedValue([{ id: "456" }]);

		const url = new URL("/event/ABC123/edit", origin);
		const request = new NextRequest(url);

		const response = await middleware(request);

		expect(response).toEqual(NextResponse.redirect(origin + "/oauth"));
	});

	it("allows event creators to access /event/:code/edit", async () => {
		(auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });
		(findEventCreatedBy as jest.Mock).mockResolvedValue([{ id: "123" }]);

		const url = new URL("/event/ABC123/edit", origin);
		const request = new NextRequest(url);

		const response = await middleware(request);

		expect(response).toEqual(NextResponse.next());
	});

	it("redirects to uppercase event code URL", async () => {
		const url = new URL("/event/abc123", origin);
		const request = new NextRequest(url);

		const response = await middleware(request);

		expect(response).toEqual(NextResponse.redirect(origin + "/event/ABC123"));
	});

	it("allows requests with valid bot API key", async () => {
		(headers as jest.Mock).mockReturnValue({
			get: (key: string) =>
				key === "x-api-key" ? envConfig.PQ_BOT_TO_WEB_API_KEY : null,
		});
		const url = new URL("/api/bot/some-endpoint", origin);
		const request = new NextRequest(url);

		const response = await middleware(request);

		expect(response).toEqual(NextResponse.next());
	});

	it("rejects requests without valid bot API key", async () => {
		(headers as jest.Mock).mockReturnValue({
			get: (key: string) => (key === "x-api-key" ? "invalid-key" : null),
		});

		const url = new URL("/api/bot/some-endpoint", origin);
		const request = new NextRequest(url);

		const response = await middleware(request);

		expect(response.status).toBe(401);
	});
});
