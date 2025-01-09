"use server";

import { z } from "zod";
import { schema } from "~/actions/event/create-event.schema";
import db from "~/db/connection";
import { event } from "~/db/schema/event";

const createEvent = async (
	data: z.infer<typeof schema>
): Promise<{ code: PotluckEvent["code"] }[]> => {
	try {
		schema.parse(data);

		return await db.insert(event).values(data).returning({ code: event.code });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default createEvent;
