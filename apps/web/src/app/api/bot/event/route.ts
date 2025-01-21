import { webApiBot } from "@potluck/utilities/validation";
import { NextRequest, NextResponse } from "next/server";
import findDiscordEventMappingByDiscordEventId from "~/actions/discord-event-mapping/find-discord-event-mapping-by-discord-event-id";
import createEvent from "~/actions/event/create-event";
import deleteEvent from "~/actions/event/delete-event";
import updateEvent from "~/actions/event/update-event";
import findUserIdByProviderAccountId from "~/actions/user/find-user-id-by-provider-account-id";

export const POST = async (request: NextRequest) => {
	const data = await request.json();

	const parsed = webApiBot.event.postSchema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
				success: false,
			},
			{ status: 400 }
		);
	}

	const { discordUserId, title, startUtcMs, endUtcMs, location, description } =
		parsed.data;

	const [createdBy] = await findUserIdByProviderAccountId({
		providerAccountId: discordUserId,
	});

	if (!createdBy) {
		return NextResponse.json(
			{
				message: "User account not found",
				success: false,
			},
			{ status: 401 }
		);
	}

	const [result] = await createEvent({
		createdBy: createdBy.id,
		description,
		endUtcMs,
		location,
		hosts: "",
		startUtcMs,
		title,
	});

	if (!result?.code) {
		return NextResponse.json(
			{
				message: "Failed to create event",
				success: false,
			},
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			code: result.code,
			message: "Event created",
			success: true,
		},
		{ status: 200 }
	);
};

export const PUT = async (request: NextRequest) => {
	const data = await request.json();

	const parsed = webApiBot.event.putSchema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
			},
			{ status: 400 }
		);
	}

	const [result] = await updateEvent(parsed.data);

	if (!result?.code) {
		return NextResponse.json(
			{
				message: "Failed to update event",
			},
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			code: parsed.data.code,
			message: "Event updated",
		},
		{ status: 200 }
	);
};

export const DELETE = async (request: NextRequest) => {
	const data = await request.json();

	const parsed = webApiBot.event.deleteSchema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
			},
			{ status: 400 }
		);
	}

	const { discordEventId } = parsed.data;

	const [mapping] = await findDiscordEventMappingByDiscordEventId({
		discordEventId,
	});

	if (!mapping) {
		return NextResponse.json(
			{
				message: "Code not found for provided event ID",
				discordEventId,
			},
			{ status: 404 }
		);
	}

	const [result] = await deleteEvent({ code: mapping.code });

	if (!result?.id) {
		return NextResponse.json(
			{
				message: "Failed to delete event",
				discordEventId,
				code: mapping.code,
			},
			{ status: 400 }
		);
	}

	return NextResponse.json(
		{
			code: mapping.code,
			message: "Event deleted",
		},
		{ status: 200 }
	);
};
