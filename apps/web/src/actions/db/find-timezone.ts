"use server";

import { z } from "zod";
import { schema } from "~/actions/db/find-timezone.schema";
import db from "~/db/connection";
import { settings } from "~/db/schema/settings";

const findTimezone = async (
	data: z.infer<typeof schema>
): Promise<{ timezone: Settings["timezone"] }[]> => {
	try {
		schema.parse(data);

		return await db.select({ timezone: settings.timezone }).from(settings);
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findTimezone;
