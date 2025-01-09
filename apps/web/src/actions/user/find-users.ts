"use server";

import { inArray } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/user/find-users.schema";
import db from "~/db/connection";
import { user } from "~/db/schema/auth/user";

const findUsers = async (
	data: z.infer<typeof schema>
): Promise<
	{
		id: User["id"];
		image: User["image"];
		name: User["name"];
	}[]
> => {
	try {
		schema.parse(data);

		return await db
			.select({ id: user.id, image: user.image, name: user.name })
			.from(user)
			.where(inArray(user.id, data.users));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findUsers;
