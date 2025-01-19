"use server";

import { botApi } from "@potluck/utilities/validation";
import { z } from "zod";
import { schema } from "~/actions/bot/fetch-discord-event-metadata.schema";
import findDiscordEventMapping from "~/actions/discord-event-mapping/find-discord-event-mapping";
import findProviderAccountIdByUserId from "~/actions/user/find-provider-account-id-by-user-id";
import botRoutes from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const fetchDiscordEventMetadata = async ({
	code,
	userId,
}: z.infer<typeof schema>): Promise<
	| {
			isMember: boolean;
			name: string;
			iconUrl: string;
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

		const data = {
			discordGuildId: mapping.discordGuildId,
			memberId: discordAccountLookup.providerAccountId,
		};

		botApi.event.getMetadataSchema.parse(data);

		const params = new URLSearchParams(data);

		const headers = new Headers({
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const response = await fetch(
			botRoutes.metadata.concat("?").concat(params.toString()),
			{ headers }
		);

		if (!response.ok) {
			console.warn("Failed to fetch Discord metadata", response.status);
			return;
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching Discord metadata:", error);
	}
};

export default fetchDiscordEventMetadata;
