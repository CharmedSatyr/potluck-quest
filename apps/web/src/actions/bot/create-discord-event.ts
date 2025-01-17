"use server";

import { z } from "zod";
import { schema } from "~/actions/bot/create-discord-event.schema";
import botApi from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const createDiscordEvent = async (
	data: z.infer<typeof schema>
): Promise<boolean> => {
	try {
		const headers = new Headers({
			"Content-Type": "application/json",
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const result = await fetch(botApi.event, {
			body: JSON.stringify(data),
			method: "POST",
			headers,
		});

		if (!result.ok) {
			console.warn("Failed to create Discord event", result.status);
			return false;
		}

		return result.ok;
	} catch (error) {
		console.error("Error fetching Discord metadata:", error);

		return false;
	}
};

export default createDiscordEvent;
