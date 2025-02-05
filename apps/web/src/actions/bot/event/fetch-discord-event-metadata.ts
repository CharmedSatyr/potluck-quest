"use server";

import { botApi } from "@potluck/utilities/validation";
import findDiscordEventMapping from "~/actions/discord-event-mapping/find-discord-event-mapping";
import findProviderAccountIdByUserId from "~/actions/user/find-provider-account-id-by-user-id";
import botRoutes from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

export type DiscordEventMetadata = {
	discordEventId: string;
	discordGuildId: string;
	isMember: boolean;
	name: string;
	iconUrl: string;
};

const fetchDiscordEventMetadata = async ({
	code,
	userId,
}: {
	code: PotluckEvent["code"];
	userId: User["id"];
}): Promise<DiscordEventMetadata | undefined> => {
	try {
		const [mapping] = await findDiscordEventMapping({ code });

		if (!mapping) {
			return;
		}

		const [discordAccountLookup] = await findProviderAccountIdByUserId({
			userId,
		});

		const { discordGuildId, discordEventId } = mapping;

		const data = {
			discordGuildId,
			discordUserId: discordAccountLookup.providerAccountId,
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

		return {
			discordEventId,
			discordGuildId,
			...(await response.json()),
		};
	} catch (error) {
		console.error("Error fetching Discord metadata:", error);
	}
};

export default fetchDiscordEventMetadata;
