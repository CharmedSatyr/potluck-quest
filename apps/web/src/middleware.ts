import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { MiddlewareConfig, NextRequest } from "next/server";
import findEventCreatedBy from "~/actions/event/find-event-created-by";
import { auth } from "~/auth";
import envConfig from "~/constants/env-config";

const hasValidApiKey = async () => {
	const headersMap = await headers();

	return envConfig.PQ_BOT_TO_WEB_API_KEY === headersMap.get("x-api-key");
};

const isAuthenticated = async () => {
	const session = await auth();

	return Boolean(session?.user?.id);
};

const isCreator = async (pathname: string) => {
	const session = await auth();

	// pathname ends with /event/:code/edit or /event/:code/edit/confirm
	const match = pathname.match(/^\/event\/([^/]+)\/edit(\/confirm)?$/);

	if (!match) {
		return false;
	}

	const code = match[1];

	const [createdBy] = await findEventCreatedBy({ code });

	return createdBy?.id === session?.user?.id;
};

export const middleware = async (request: NextRequest) => {
	const { origin, pathname } = request.nextUrl;

	// Event route
	if (pathname.startsWith("/event/")) {
		const code = request.nextUrl.pathname.split("/")[2];

		if (code !== code.toUpperCase()) {
			return NextResponse.redirect(
				origin.concat("/event/".concat(code.toUpperCase()))
			);
		}
	}

	// Bot routes
	if (pathname.startsWith("/api/bot/")) {
		// Auth path doesn't require API key
		if (pathname.startsWith("/api/bot/auth/")) {
			return NextResponse.next();
		}

		if (await hasValidApiKey()) {
			return NextResponse.next();
		}

		return NextResponse.json(null, { status: 401 });
	}

	// Protected routes
	if (!(await isAuthenticated())) {
		return NextResponse.redirect(origin.concat("/oauth"));
	}

	// Creator-only routes
	if (
		!(await isCreator(pathname)) &&
		(pathname.endsWith("/edit") || pathname.endsWith("/edit/confirm"))
	) {
		return NextResponse.redirect(origin.concat("/oauth"));
	}

	return NextResponse.next();
};

export const config: MiddlewareConfig = {
	matcher: [
		// Event route
		"/event/:code",
		// Protected routes
		"/dashboard",
		"/settings",
		"/plan/confirm",
		// Creator-only routes
		"/event/:code/edit",
		"/event/:code/edit/confirm",
		// Bot routes
		"/api/bot/:path*",
	],
};
