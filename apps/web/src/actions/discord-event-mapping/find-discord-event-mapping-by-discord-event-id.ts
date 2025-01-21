"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/discord-event-mapping/find-discord-event-mapping-by-discord-event-id.schema";
import db from "~/db/connection";
import { discordEventMapping } from "~/db/schema/discord-event-mapping";

/** Discord mappings may not exist for events created through the website. */
const findDiscordEventMappingByDiscordEventId = async (
	data: z.infer<typeof schema>
): Promise<{ code: DiscordEventMapping["potluckEventCode"] }[]> => {
	try {
		schema.parse(data);

		return db
			.select({
				code: discordEventMapping.potluckEventCode,
			})
			.from(discordEventMapping)
			.where(eq(discordEventMapping.discordEventId, data.discordEventId));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findDiscordEventMappingByDiscordEventId;