"use server";

import { z } from "@potluck/utilities/validation";
import { asc, eq } from "drizzle-orm";
import { schema } from "~/actions/event/find-events-by-user.schema";
import db from "~/db/connection";
import { event } from "~/db/schema/event";

const findEventsByUser = async (
	data: z.infer<typeof schema>
): Promise<PotluckEvent[]> => {
	try {
		schema.parse(data);

		return await db
			.select()
			.from(event)
			.where(eq(event.createdBy, data.createdBy))
			.orderBy(asc(event.startUtcMs));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findEventsByUser;
