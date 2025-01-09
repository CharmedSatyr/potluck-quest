"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/rsvp/find-user-event-rsvp.schema";
import db from "~/db/connection";
import { rsvp } from "~/db/schema/rsvp";

const findUserEventRsvp = async (
	data: z.infer<typeof schema>
): Promise<{ response: Rsvp["response"] }[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		return await db
			.select({
				response: rsvp.response,
			})
			.from(rsvp)
			.where(
				and(eq(rsvp.createdBy, data.createdBy), eq(rsvp.eventId, event.id))
			);
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findUserEventRsvp;
