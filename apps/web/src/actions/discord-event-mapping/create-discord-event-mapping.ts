"use server";

import { z } from "zod";
import { schema } from "~/actions/discord-event-mapping/create-discord-event-mapping.schema";
import db from "~/db/connection";
import { discordEventMapping } from "~/db/schema/discord-event-mapping";

const createDiscordEventMapping = async (
	data: z.infer<typeof schema>
): Promise<{ id: DiscordEventMapping["id"] }[]> => {
	try {
		const { discordEventId, discordGuildId, potluckEventCode } = data;

		return db
			.insert(discordEventMapping)
			.values({
				discordEventId,
				discordGuildId,
				potluckEventCode,
			})
			.returning({ id: discordEventMapping.id });
	} catch (err) {
		console.error(err);

		return [];
	}
};

export default createDiscordEventMapping;
