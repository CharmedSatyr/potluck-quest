import { webApiBot } from "@potluck/utilities/validation";
import { NextRequest, NextResponse } from "next/server";
import findEventCodeByDiscordEventId from "~/actions/discord-event-mapping/find-event-code-by-discord-event-id";
import upsertDiscordInterestedCount from "~/actions/rsvp/upsert-anonymous-rsvps";
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

	const {
		discordEventId,
		discordInterestedCount,
		discordUserId,
		message,
		response,
	} = parsed.data;

	const [[createdBy], [mapping]] = await Promise.all([
		findUserIdByProviderAccountId({
			providerAccountId: discordUserId,
		}),
		findEventCodeByDiscordEventId({ discordEventId }),
	]);

	if (!mapping) {
		return NextResponse.json(
			{
				message: "Code not found for provided event ID",
				discordEventId,
			},
			{ status: 400 }
		);
	}

	// Nothing to show the user on failure.
	await upsertDiscordInterestedCount({
		code: mapping.code,
		discordInterestedCount,
	});

	if (createdBy) {
		const result = await upsertRsvp({
			code: mapping.code,
			createdBy: createdBy.id,
			message,
			response,
		});

		if (!result?.success) {
			return NextResponse.json(
				{ message: "Failed to create RSVP" },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json(
		{
			message: createdBy ? "Created RSVP" : "Updated Discord interested count",
		},
		{ status: 200 }
	);
};
