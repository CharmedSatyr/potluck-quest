"use server";

import { z } from "zod";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/rsvp/upsert-anonymous-rsvps.schema";
import db from "~/db/connection";
import { anonymousRsvp } from "~/db/schema/anonymous-rsvps";

const upsertAnonymousRsvps = async (
	data: z.infer<typeof schema>
): Promise<{ success: boolean }> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return { success: false };
		}

		const [result] = await db
			.insert(anonymousRsvp)
			.values({
				eventId: event.id,
			})
			.onConflictDoUpdate({
				target: [anonymousRsvp.eventId],
				set: {
					interestedCount: data.interestedCount,
				},
			})
			.returning({ id: anonymousRsvp.id });

		if (result.id) {
			return { success: true };
		}

		return { success: false };
	} catch (err) {
		console.error(err);

		return { success: false };
	}
};

export default upsertAnonymousRsvps;
