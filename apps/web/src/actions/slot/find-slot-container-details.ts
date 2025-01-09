"use server";

import { eq, sum } from "drizzle-orm";
import { z } from "zod";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/slot/find-slot-container-details.schema";
import db from "~/db/connection";
import { user } from "~/db/schema/auth/user";
import { commitment } from "~/db/schema/commitment";
import { slot } from "~/db/schema/slot";

type SlotContainerDetails = {
	slotId: Slot["id"];
	item: Slot["item"];
	requestedCount: Slot["count"];
	totalCommitments: number;
	users: {
		id: User["id"];
		image: User["image"];
		name: User["name"];
		commitments: number;
	}[];
}[];

const findSlotContainerDetails = async (
	data: z.infer<typeof schema>
): Promise<SlotContainerDetails> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			return [];
		}

		const users = await db
			.select({
				commitments: sum(commitment.quantity).mapWith(Number),
				slotId: slot.id,
				user: { id: user.id, image: user.image, name: user.name },
			})
			.from(slot)
			.where(eq(slot.eventId, event.id))
			.leftJoin(commitment, eq(commitment.slotId, slot.id))
			.innerJoin(user, eq(user.id, commitment.createdBy))
			.groupBy(slot.id, user.id);

		const slots = await db
			.select({
				slotId: slot.id,
				item: slot.item,
				requestedCount: slot.count,
				totalCommitments: sum(commitment.quantity).mapWith(Number),
			})
			.from(slot)
			.where(eq(slot.eventId, event.id))
			.leftJoin(commitment, eq(commitment.slotId, slot.id))
			.groupBy(slot.id)
			.orderBy(slot.order);

		// TODO: `users` and `slots` queries should be combined.
		// There is a known issue where column references
		// become ambiguous in subqueries in Drizzle.
		// https://github.com/drizzle-team/drizzle-orm/issues/2772
		// https://github.com/drizzle-team/drizzle-orm/issues/1242
		return slots.map((slot) => ({
			...slot,
			totalCommitments: slot.totalCommitments ?? 0,
			users: users
				.filter((user) => user.slotId === slot.slotId)
				.map(({ commitments, user }) => ({
					id: user.id,
					image: user.image,
					name: user.name,
					commitments,
				})),
		}));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findSlotContainerDetails;
