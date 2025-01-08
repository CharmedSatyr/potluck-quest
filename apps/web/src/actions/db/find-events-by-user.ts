"use server";

import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/db/find-events-by-user.schema";
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
			.orderBy(desc(event.startUtcMs));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findEventsByUser;
