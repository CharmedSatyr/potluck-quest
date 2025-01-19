import { webApiBot } from "@potluck/utilities/validation";
import { NextRequest, NextResponse } from "next/server";
import findSlotsWithNeeded from "~/actions/slot/find-slots-with-needed";

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl;

	const code = searchParams.get("code");

	const parsed = webApiBot.slots.getSchema.safeParse({ code });

	if (!parsed.success) {
		return NextResponse.json(
			{ message: "Event code required" },
			{ status: 400 }
		);
	}

	const slots = await findSlotsWithNeeded({ code: parsed.data.code });

	return NextResponse.json({ slots }, { status: 200 });
};
