"use server";

import { z } from "@potluck/utilities/validation";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/slot/create-slots.schema";
import db from "~/db/connection";
import { slot } from "~/db/schema/slot";

const createSlots = async (
	data: z.infer<typeof schema>
): Promise<{ id: Slot["id"] }[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return [];
		}

		const values = data.slots.map((slot) => ({
			...slot,
			eventId: event.id,
		}));

		return await db.insert(slot).values(values).returning({ id: slot.id });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default createSlots;
