"use server";

import { z } from "@potluck/utilities/validation";
import { schema } from "~/actions/commitment/create-commitment.schema";
import db from "~/db/connection";
import { commitment } from "~/db/schema/commitment";

const createCommitment = async (
	data: z.infer<typeof schema>
): Promise<{ id: Commitment["id"] }[]> => {
	try {
		schema.parse(data);

		return await db
			.insert(commitment)
			.values(data)
			.returning({ id: commitment.id });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default createCommitment;
