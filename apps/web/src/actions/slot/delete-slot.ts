"use server";

import { z } from "@potluck/utilities/validation";
import { eq } from "drizzle-orm";
import { schema } from "~/actions/slot/delete-slot.schema";
import db from "~/db/connection";
import { slot } from "~/db/schema/slot";

const deleteSlot = async (
	data: z.infer<typeof schema>
): Promise<{ id: Slot["id"] }[]> => {
	try {
		schema.parse(data);

		return await db
			.delete(slot)
			.where(eq(slot.id, data.id))
			.returning({ id: slot.id });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default deleteSlot;
