"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/actions/discord-event-mapping/find-discord-event-mapping.schema";
import db from "~/db/connection";
import { discordEventMapping } from "~/db/schema/discord-event-mapping";

/** Discord mappings may not exist for events created through the website. */
const findDiscordEventMapping = async (
	data: z.infer<typeof schema>
): Promise<
	Pick<DiscordEventMapping, "discordEventId" | "discordGuildId">[]
> => {
	try {
		schema.parse(data);

		return db
			.select({
				discordEventId: discordEventMapping.discordEventId,
				discordGuildId: discordEventMapping.discordGuildId,
			})
			.from(discordEventMapping)
			.where(eq(discordEventMapping.potluckEventCode, data.code));
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default findDiscordEventMapping;
