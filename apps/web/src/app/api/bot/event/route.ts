import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import createEvent from "~/actions/event/create-event";
import { schema as createEventSchema } from "~/actions/event/create-event.schema";
import deleteEvent from "~/actions/event/delete-event";
import { schema as deleteEventSchema } from "~/actions/event/delete-event.schema";
import findEvent from "~/actions/event/find-event";
import updateEvent from "~/actions/event/update-event";
import { schema as updateEventSchema } from "~/actions/event/update-event.schema";
import findUserIdByProviderAccountId from "~/actions/user/find-user-id-by-provider-account-id";

export const POST = async (request: NextRequest) => {
	const data = await request.json();

	const schema = createEventSchema
		.omit({ createdBy: true, hosts: true })
		.extend({
			discordUserId: z.string().trim(),
		});

	const parsed = schema.safeParse(data);

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

	const parsed = updateEventSchema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
			},
			{ status: 400 }
		);
	}

	const { code, description, endUtcMs, location, startUtcMs, title } =
		parsed.data;

	const [result] = await updateEvent({
		code,
		description,
		endUtcMs,
		location,
		startUtcMs,
		title,
	});

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
			code,
			message: "Event updated",
		},
		{ status: 200 }
	);
};

export const DELETE = async (request: NextRequest) => {
	const data = await request.json();

	const parsed = deleteEventSchema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
			},
			{ status: 400 }
		);
	}

	const { code } = parsed.data;

	const [event] = await findEvent({ code });

	if (!event) {
		return NextResponse.json(
			{ message: `Event with code ${code} does not exist` },
			{ status: 400 }
		);
	}

	const [result] = await deleteEvent({ code });

	if (!result?.id) {
		return NextResponse.json(
			{ message: "Failed to delete event" },
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			code,
			message: "Event deleted",
		},
		{ status: 200 }
	);
};
