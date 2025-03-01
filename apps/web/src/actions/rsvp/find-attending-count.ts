"use server";

import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/rsvp/find-attending-count.schema";
import db from "~/db/connection";
import { rsvp } from "~/db/schema/rsvp";

const findAttendingCount = async (
	data: z.infer<typeof schema>
): Promise<{ count: number }[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return [];
		}

		return await db
			.select({ count: count() })
			.from(rsvp)
			.where(and(eq(rsvp.eventId, event.id), eq(rsvp.response, "yes")));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findAttendingCount;
