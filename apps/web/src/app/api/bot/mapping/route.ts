import { webApiBot } from "@potluck/utilities/validation";
import { NextRequest, NextResponse } from "next/server";
import createDiscordEventMapping from "~/actions/discord-event-mapping/create-discord-event-mapping";
import findEventCodesByDiscordEventIds from "~/actions/discord-event-mapping/find-event-codes-by-discord-event-ids";

export const POST = async (request: NextRequest) => {
	const data = await request.json();

	const parsed = webApiBot.mapping.postSchema.safeParse(data);

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

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl;

	const data = {
		discordEventIds: searchParams.get("discordEventIds")?.split(","),
	};

	const parsed = webApiBot.mapping.getSchema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
			},
			{ status: 400 }
		);
	}

	const results = await findEventCodesByDiscordEventIds({
		discordEventIds: parsed.data.discordEventIds,
	});

	if (!results.length) {
		return NextResponse.json(
			{
				message: "Codes not found for provided event ID",
				discordEventIds: parsed.data.discordEventIds,
			},
			{ status: 404 }
		);
	}

	const codesById = results.map((result) => ({
		[result.discordEventId]: result.code,
	}));

	return NextResponse.json(codesById, { status: 200 });
};
