import { webApiBot } from "@potluck/utilities/validation";
import { NextRequest, NextResponse } from "next/server";
import findDiscordEventMappingByDiscordEventId from "~/actions/discord-event-mapping/find-discord-event-mapping-by-discord-event-id";
import upsertRsvp from "~/actions/rsvp/upsert-rsvp";
import findUserIdByProviderAccountId from "~/actions/user/find-user-id-by-provider-account-id";

export const POST = async (request: NextRequest) => {
	const data = await request.json();

	const parsed = webApiBot.rsvp.postSchema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
			},
			{ status: 400 }
		);
	}

	const { discordEventId, discordUserId, message, response } = parsed.data;

	const [createdBy] = await findUserIdByProviderAccountId({
		providerAccountId: discordUserId,
	});

	if (!createdBy) {
		// TODO: This only handles if the guest has a PQ account! They should still be accounted for regardless.
		// Accept total number of guests from bot and keep that updated.
		return NextResponse.json(
			{
				message: "User account not found",
			},
			{ status: 401 }
		);
	}

	const [mapping] = await findDiscordEventMappingByDiscordEventId({
		discordEventId,
	});

	if (!mapping) {
		// TODO: This only handles if the guest has a PQ account! They should still be accounted for regardless.
		// Accept total number of guests from bot and keep that updated?
		return NextResponse.json(
			{
				message: "Code not found for provided event ID",
				discordEventId,
			},
			{ status: 400 }
		);
	}

	const result = await upsertRsvp({
		code: mapping.code,
		createdBy: createdBy.id,
		message,
		response,
	});

	if (!result?.success) {
		return NextResponse.json(
			{
				message: "Failed to create commitment",
				success: false,
			},
			{ status: 500 }
		);
	}

	return NextResponse.json(null, { status: 200 });
};
