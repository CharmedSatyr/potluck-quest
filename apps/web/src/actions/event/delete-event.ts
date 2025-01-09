"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/event/delete-event.schema";
import db from "~/db/connection";
import { event } from "~/db/schema/event";

const deleteEvent = async (
	data: z.infer<typeof schema>
): Promise<{ id: PotluckEvent["id"] }[]> => {
	try {
		schema.parse(data);

		return await db
			.delete(event)
			.where(eq(event.code, data.code))
			.returning({ id: event.id });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default deleteEvent;
