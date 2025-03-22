import { jest } from "@jest/globals";
import { Request, Response } from "express";
import type { IncomingHttpHeaders } from "http";

jest.unstable_mockModule("~/constants/env-config.js", () => ({
	default: { PQ_WEB_TO_BOT_API_KEY: "test-api-key" },
}));

const { default: verifyApiKey } = await import(
	"~/middleware/verify-api-key.js"
);

describe("verifyApiKey middleware", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: jest.Mock;

	beforeEach(() => {
		req = { headers: {} };
		res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as Partial<Response>;
		next = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should call next when API key is correct", () => {
		(req.headers as IncomingHttpHeaders)["x-api-key"] = "test-api-key";

		verifyApiKey(req as Request, res as Response, next);

		expect(next).toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
	});

	it("should return 401 when API key is missing", () => {
		verifyApiKey(req as Request, res as Response, next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.send).toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});

	it("should return 401 when API key is incorrect", () => {
		(req.headers as IncomingHttpHeaders)["x-api-key"] = "wrong-key";

		verifyApiKey(req as Request, res as Response, next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.send).toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});
});
