"use server";

import { z } from "@potluck/utilities/validation";
import { inArray } from "drizzle-orm";
import { schema } from "~/actions/discord-event-mapping/find-event-codes-by-discord-event-ids.schema";
import db from "~/db/connection";
import { discordEventMapping } from "~/db/schema/discord-event-mapping";

/** Discord mappings may not exist for events created through the website. */
const findEventCodesByDiscordEventIds = async (
	data: z.infer<typeof schema>
): Promise<
	{
		code: DiscordEventMapping["potluckEventCode"];
		discordEventId: DiscordEventMapping["discordEventId"];
	}[]
> => {
	try {
		schema.parse(data);

		return db
			.select({
				code: discordEventMapping.potluckEventCode,
				discordEventId: discordEventMapping.discordEventId,
			})
			.from(discordEventMapping)
			.where(inArray(discordEventMapping.discordEventId, data.discordEventIds));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findEventCodesByDiscordEventIds;
