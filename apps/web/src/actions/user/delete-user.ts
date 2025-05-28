"use server";

import { z } from "@potluck/utilities/validation";
import { eq } from "drizzle-orm";
import { schema } from "~/actions/user/delete-user.schema";
import db from "~/db/connection";
import { user } from "~/db/schema/auth/user";

const deleteUser = async (data: z.infer<typeof schema>): Promise<boolean> => {
	try {
		schema.parse(data);

		await db.delete(user).where(eq(user.id, data.userId));

		return true;
	} catch (err) {
		console.error(err);

		return false;
	}
};

export default deleteUser;
