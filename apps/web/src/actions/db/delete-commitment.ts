"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/db/delete-commitment.schema";
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
