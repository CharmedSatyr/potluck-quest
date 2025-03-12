"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/user/delete-user.schema";
import db from "~/db/connection";
import { user } from "~/db/schema/auth/user";

const deleteUser = async (data: z.infer<typeof schema>): Promise<void> => {
	try {
		schema.parse(data);

		await db.delete(user).where(eq(user.id, data.userId));
	} catch (err) {
		console.error(err);
	}
};

export default deleteUser;
