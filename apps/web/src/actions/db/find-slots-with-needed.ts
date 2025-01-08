"use server";

import { count, eq, sql } from "drizzle-orm";
import { z } from "zod";
import findEvent from "~/actions/db/find-event";
import { schema } from "~/actions/db/find-slots-with-needed.schema";
import db from "~/db/connection";
import { commitment } from "~/db/schema/commitment";
import { slot } from "~/db/schema/slot";

type SlotsWithNeeded = {
	id: Slot["id"];
	item: Slot["item"];
	needed: number;
};

const findSlotsWithNeeded = async (
	data: z.infer<typeof schema>
): Promise<SlotsWithNeeded[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return [];
		}

		return await db
			.select({
				id: slot.id,
				item: slot.item,
				needed: sql<number>`cast(${slot.count} - ${count(commitment)} as int)`,
			})
			.from(slot)
			.where(eq(slot.eventId, event.id))
			.leftJoin(commitment, eq(commitment.slotId, slot.id))
			.groupBy(slot.id)
			.orderBy(slot.order);
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findSlotsWithNeeded;
