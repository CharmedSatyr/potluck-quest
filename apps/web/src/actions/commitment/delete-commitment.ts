"use server";

import { z } from "@potluck/utilities/validation";
import { and, eq } from "drizzle-orm";
import { schema } from "~/actions/commitment/delete-commitment.schema";
import db from "~/db/connection";
import { commitment } from "~/db/schema/commitment";

const deleteCommitment = async (
	data: z.infer<typeof schema>
): Promise<{ id: Commitment["id"] }[]> => {
	try {
		schema.parse(data);

		return await db
			.delete(commitment)
			.where(
				and(
					eq(commitment.createdBy, data.createdBy),
					eq(commitment.id, data.id)
				)
			)
			.returning({ id: commitment.id });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default deleteCommitment;
