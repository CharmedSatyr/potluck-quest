"use server";

import { z } from "@potluck/utilities/validation";
import { eq } from "drizzle-orm";
import { schema } from "~/actions/event/update-event.schema";
import db from "~/db/connection";
import { event } from "~/db/schema/event";

const updateEvent = async (
	data: z.infer<typeof schema>
): Promise<{ code: PotluckEvent["code"] }[]> => {
	try {
		schema.parse(data);

		return await db
			.update(event)
			.set(data)
			.where(eq(event.code, data.code))
			.returning({ code: event.code });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default updateEvent;
