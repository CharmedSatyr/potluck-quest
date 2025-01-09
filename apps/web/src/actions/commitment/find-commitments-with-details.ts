"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/commitment/find-commitments-with-details.schema";
import findEvent from "~/actions/event/find-event";
import db from "~/db/connection";
import { user } from "~/db/schema/auth/user";
import { commitment } from "~/db/schema/commitment";
import { slot } from "~/db/schema/slot";

type CommitmentWithDetails = {
	commitmentId: Commitment["id"];
	description: Commitment["description"];
	item: Slot["item"];
	quantity: Commitment["quantity"];
	slotId: Slot["id"];
	user: {
		id: User["id"];
		image: User["image"];
		name: User["name"];
	};
};

const findCommitmentsWithDetails = async (
	data: z.infer<typeof schema>
): Promise<CommitmentWithDetails[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		return await db
			.select({
				commitmentId: commitment.id,
				description: commitment.description,
				item: slot.item,
				quantity: commitment.quantity,
				slotId: slot.id,
				user: {
					id: user.id,
					image: user.image,
					name: user.name,
				},
			})
			.from(slot)
			.where(eq(slot.eventId, event.id))
			.innerJoin(commitment, eq(commitment.slotId, slot.id))
			.innerJoin(user, eq(commitment.createdBy, user.id))
			.orderBy(slot.order);
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findCommitmentsWithDetails;
