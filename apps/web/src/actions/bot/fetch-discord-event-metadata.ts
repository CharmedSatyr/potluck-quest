"use server";

import { z } from "zod";
import { schema } from "~/actions/bot/fetch-discord-event-metadata.schema";
import findDiscordEventMapping from "~/actions/discord-event-mapping/find-discord-event-mapping";
import botApi from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const fetchDiscordEventMetadata = async ({
	code,
}: z.infer<typeof schema>): Promise<
	| {
			name: string;
			iconURL: string;
	  }
	| undefined
> => {
	try {
		const [mapping] = await findDiscordEventMapping({ code });

		const { discordEventId, discordGuildId } = mapping;

		const params = new URLSearchParams({ discordEventId, discordGuildId });

		const headers = new Headers({
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const result = await fetch(
			botApi.metadata.concat("?").concat(params.toString()),
			{ headers }
		);

		if (!result.ok) {
			console.warn("Failed to fetch Discord metadata", result.status);
			return;
		}

		const { name, iconURL } = await result.json();

		return { name, iconURL };
	} catch (error) {
		console.error("Error fetching Discord metadata:", error);
	}
};

export default fetchDiscordEventMetadata;
