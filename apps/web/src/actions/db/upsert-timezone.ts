"use server";

import { z } from "zod";
import { schema } from "~/actions/db/upsert-timezone.schema";
import db from "~/db/connection";
import { settings } from "~/db/schema/settings";

const upsertTimezone = async (
	data: z.infer<typeof schema>
): Promise<{ timezone: Settings["timezone"] }[]> => {
	try {
		schema.parse(data);

		return await db
			.insert(settings)
			.values({ timezone: data.timezone, userId: data.userId })
			.onConflictDoUpdate({
				target: settings.userId,
				set: {
					timezone: data.timezone,
				},
			})
			.returning({ timezone: settings.timezone });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default upsertTimezone;
