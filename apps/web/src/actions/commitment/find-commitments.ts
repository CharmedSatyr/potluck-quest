"use server";

import { z } from "@potluck/utilities/validation";
import { eq } from "drizzle-orm";
import { schema } from "~/actions/commitment/find-commitments.schema";
import findEvent from "~/actions/event/find-event";
import db from "~/db/connection";
import { commitment } from "~/db/schema/commitment";
import { slot } from "~/db/schema/slot";

const findCommitments = async (
	data: z.infer<typeof schema>
): Promise<Commitment[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.eventCode });

		if (!event) {
			return [];
		}

		const {
			createdAt,
			createdBy,
			description,
			id,
			quantity,
			slotId,
			updatedAt,
		} = commitment;

		return await db
			.select({
				createdAt,
				createdBy,
				description,
				id,
				quantity,
				slotId,
				updatedAt,
			})
			.from(slot)
			.where(eq(slot.eventId, event.id))
			.innerJoin(commitment, eq(slot.id, commitment.slotId))
			.orderBy(slot.order);
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findCommitments;
