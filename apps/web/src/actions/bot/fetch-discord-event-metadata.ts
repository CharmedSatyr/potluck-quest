"use server";

import { z } from "zod";
import { schema } from "~/actions/bot/fetch-discord-event-metadata.schema";
import findDiscordEventMapping from "~/actions/discord-event-mapping/find-discord-event-mapping";
import findProviderAccountIdByUserId from "~/actions/user/find-provider-account-id-by-user-id";
import botApi from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const fetchDiscordEventMetadata = async ({
	code,
	userId,
}: z.infer<typeof schema>): Promise<
	| {
			isMember: boolean;
			name: string;
			iconURL: string;
	  }
	| undefined
> => {
	try {
		const [mapping] = await findDiscordEventMapping({ code });

		if (!mapping) {
			return;
		}

		const [discordAccountLookup] = await findProviderAccountIdByUserId({
			userId,
		});

		const params = new URLSearchParams({
			discordGuildId: mapping.discordGuildId,
			memberId: discordAccountLookup.providerAccountId,
		});

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

		return await result.json();
	} catch (error) {
		console.error("Error fetching Discord metadata:", error);
	}
};

export default fetchDiscordEventMetadata;
