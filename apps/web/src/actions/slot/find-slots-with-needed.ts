"use server";

import { z } from "@potluck/utilities/validation";
import { eq, sql, sum } from "drizzle-orm";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/slot/find-slots-with-needed.schema";
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
				needed: sql<number>`cast(coalesce(${slot.count}, 0) - coalesce(${sum(commitment.quantity)}, 0) as int)`,
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
