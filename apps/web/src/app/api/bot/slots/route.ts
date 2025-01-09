import { NextRequest, NextResponse } from "next/server";
import findSlotsWithNeeded from "~/actions/slot/find-slots-with-needed";

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl;

	const code = searchParams.get("code");

	if (!code) {
		return NextResponse.json(
			{ message: "Event code required" },
			{ status: 400 }
		);
	}

	const slots = await findSlotsWithNeeded({ code });

	return NextResponse.json({ slots }, { status: 200 });
};
