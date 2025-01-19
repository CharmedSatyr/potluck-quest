"use server";

import { eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/commitment/delete-user-event-commitments.schema";
import findEvent from "~/actions/event/find-event";
import db from "~/db/connection";
import { commitment } from "~/db/schema/commitment";
import { slot } from "~/db/schema/slot";

const deleteUserEventCommitments = async (
	data: z.infer<typeof schema>
): Promise<{ id: Commitment["id"] }[]> => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		if (!event) {
			// TODO: Add some logging for these.
			return [];
		}

		const commitments = await db
			.select({ id: commitment.id })
			.from(slot)
			.where(eq(slot.eventId, event.id))
			.innerJoin(commitment, eq(commitment.createdBy, data.createdBy));

		if (!commitments.length) {
			return [];
		}

		const commitmentIds = commitments.map((c) => c.id);

		return await db
			.delete(commitment)
			.where(inArray(commitment.id, commitmentIds))
			.returning({ id: commitment.id });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default deleteUserEventCommitments;
