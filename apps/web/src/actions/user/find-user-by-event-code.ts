"use server";

import { z } from "@potluck/utilities/validation";
import { eq } from "drizzle-orm";
import findEvent from "~/actions/event/find-event";
import { schema } from "~/actions/user/find-user-by-event-code.schema";
import db from "~/db/connection";
import { user } from "~/db/schema/auth/user";

const findUserByEventCode = async (data: z.infer<typeof schema>) => {
	try {
		schema.parse(data);

		const [event] = await findEvent({ code: data.code });

		return await db
			.select({ id: user.id, image: user.image, name: user.name })
			.from(user)
			.where(eq(user.id, event.createdBy));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findUserByEventCode;
