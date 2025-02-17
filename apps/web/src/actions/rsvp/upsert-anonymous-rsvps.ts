"use server";

import { z } from "zod";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/rsvp/upsert-anonymous-rsvps.schema";
import db from "~/db/connection";
import { anonymousRsvps } from "~/db/schema/anonymous-rsvps";

const upsertDiscordInterestedCount = async (
	data: z.infer<typeof schema>
): Promise<void> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return;
		}

		await db
			.insert(anonymousRsvps)
			.values({
				eventId: event.id,
			})
			.onConflictDoUpdate({
				target: [anonymousRsvps.eventId],
				set: {
					discordInterestedCount: data.discordInterestedCount,
				},
			});
	} catch (err) {
		console.error(err);
	}
};

export default upsertDiscordInterestedCount;
