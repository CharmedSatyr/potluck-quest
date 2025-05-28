"use server";

import { z } from "@potluck/utilities/validation";
import { asc, eq } from "drizzle-orm";
import { schema } from "~/actions/event/find-events-by-user-with-rsvp.schema";
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
			.orderBy(asc(event.startUtcMs));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findEventsByUserWithRsvp;
