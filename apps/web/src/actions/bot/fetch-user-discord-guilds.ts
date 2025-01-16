"use server";

import { z } from "zod";
import { schema } from "~/actions/bot/fetch-user-discord-guilds.schema";
import findProviderAccountIdByUserId from "~/actions/user/find-provider-account-id-by-user-id";
import botApi from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const fetchUserDiscordGuilds = async ({
	userId,
}: z.infer<typeof schema>): Promise<
	{
		guildId: string;
		name: string;
		iconURL: string;
	}[]
> => {
	try {
		const [discordAccountLookup] = await findProviderAccountIdByUserId({
			userId,
		});

		const params = new URLSearchParams({
			userId: discordAccountLookup.providerAccountId,
		});

		const headers = new Headers({
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const result = await fetch(
			botApi.guilds.concat("?").concat(params.toString()),
			{ headers }
		);

		if (!result.ok) {
			console.warn("Failed to fetch user Discord guilds", result.status);
			return [];
		}

		const parsed: {
			guilds: { name: string; guildId: string; iconURL: string }[];
		} = await result.json();

		return parsed.guilds;
	} catch (error) {
		console.error("Error fetching user Discord guilds:", error);

		return [];
	}
};

export default fetchUserDiscordGuilds;
