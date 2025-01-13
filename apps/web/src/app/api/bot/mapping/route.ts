import { NextRequest, NextResponse } from "next/server";
import createDiscordEventMapping from "~/actions/discord-event-mapping/create-discord-event-mapping";
import { schema } from "~/actions/discord-event-mapping/create-discord-event-mapping.schema";

export const POST = async (request: NextRequest) => {
	const data = await request.json();

	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
			},
			{ status: 400 }
		);
	}

	const [result] = await createDiscordEventMapping(parsed.data);

	if (!result?.id) {
		return NextResponse.json(
			{
				message: "Failed to map Discord event to Potluck Quest event",
			},
			{ status: 500 }
		);
	}

	return NextResponse.json(null, { status: 200 });
};
