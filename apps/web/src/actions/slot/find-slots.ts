"use server";

import { z } from "@potluck/utilities/validation";
import { eq } from "drizzle-orm";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/slot/find-slots.schema";
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
