"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import findEvent from "~/actions/db/find-event";
import { schema } from "~/actions/db/find-slots.schema";
import db from "~/db/connection";
import { slot } from "~/db/schema/slot";

const findSlots = async (data: z.infer<typeof schema>): Promise<Slot[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return [];
		}

		return await db
			.select()
			.from(slot)
			.where(eq(slot.eventId, event.id))
			.orderBy(slot.order);
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findSlots;
