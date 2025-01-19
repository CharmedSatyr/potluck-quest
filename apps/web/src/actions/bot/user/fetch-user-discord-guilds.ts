"use server";

import { botApi } from "@potluck/utilities/validation";
import { z } from "zod";
import { schema } from "~/actions/bot/user/fetch-user-discord-guilds.schema";
import findProviderAccountIdByUserId from "~/actions/user/find-provider-account-id-by-user-id";
import botRoutes from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const fetchUserDiscordGuilds = async ({
	userId,
}: z.infer<typeof schema>): Promise<
	{
		guildId: string;
		name: string;
		iconUrl: string;
	}[]
> => {
	try {
		const [discordAccountLookup] = await findProviderAccountIdByUserId({
			userId,
		});

		const data = { discordUserId: discordAccountLookup.providerAccountId };

		botApi.user.getGuildsSchema.parse(data);

		const params = new URLSearchParams(data);

		const headers = new Headers({
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const response = await fetch(
			botRoutes.guilds.concat("?").concat(params.toString()),
			{ headers }
		);

		if (!response.ok) {
			console.warn("Failed to fetch user Discord guilds", response.status);
			return [];
		}

		const result: {
			guilds: { name: string; guildId: string; iconUrl: string }[];
		} = await response.json();

		return result.guilds;
	} catch (error) {
		console.error("Error fetching user Discord guilds:", error);

		return [];
	}
};

export default fetchUserDiscordGuilds;
