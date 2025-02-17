"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/rsvp/find-interested-count-by-event.schema";
import db from "~/db/connection";
import { anonymousRsvps } from "~/db/schema/anonymous-rsvps";

const findInterestedCountByEvent = async (
	data: z.infer<typeof schema>
): Promise<AnonymousRsvps["discordInterestedCount"]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return 0;
		}

		const [result] = await db
			.select({
				discordInterestedCount: anonymousRsvps.discordInterestedCount,
			})
			.from(anonymousRsvps)
			.where(eq(anonymousRsvps.eventId, event.id));

		return result.discordInterestedCount;
	} catch (err) {
		console.error(err);

		return 0;
	}
};

export default findInterestedCountByEvent;
