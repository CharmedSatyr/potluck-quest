"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/db/find-commitments-by-user.schema";
import db from "~/db/connection";
import { commitment } from "~/db/schema/commitment";

const findCommitmentsByUser = async (
	data: z.infer<typeof schema>
): Promise<Commitment[]> => {
	try {
		schema.parse(data);

		return await db
			.select()
			.from(commitment)
			.where(eq(commitment.createdBy, data.id));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findCommitmentsByUser;
