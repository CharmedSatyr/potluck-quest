"use server";

import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/db/find-events-by-user-with-rsvp.schema";
import db from "~/db/connection";
import { event } from "~/db/schema/event";
import { rsvp } from "~/db/schema/rsvp";

const findEventsByUserWithRsvp = async (
	data: z.infer<typeof schema>
): Promise<
	{
		code: PotluckEvent["code"];
		description: PotluckEvent["description"];
		location: PotluckEvent["location"];
		startUtcMs: PotluckEvent["startUtcMs"];
		title: PotluckEvent["title"];
	}[]
> => {
	try {
		schema.parse(data);

		const { code, description, location, startUtcMs, title } = event;

		return await db
			.select({
				code,
				description,
				location,
				startUtcMs,
				title,
			})
			.from(rsvp)
			.where(eq(rsvp.createdBy, data.id))
			.innerJoin(event, eq(event.id, rsvp.eventId))
			.orderBy(desc(event.startUtcMs));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findEventsByUserWithRsvp;
