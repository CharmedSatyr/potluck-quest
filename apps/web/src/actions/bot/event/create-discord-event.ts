"use server";

import { botApi } from "@potluck/utilities/validation";
import { z } from "@potluck/utilities/validation";
import botRoutes from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const createDiscordEvent = async (
	data: z.infer<typeof botApi.event.postSchema>
): Promise<boolean> => {
	try {
		botApi.event.postSchema.parse(data);

		const headers = new Headers({
			"Content-Type": "application/json",
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const response = await fetch(botRoutes.event, {
			body: JSON.stringify(data),
			method: "POST",
			headers,
		});

		if (!response.ok) {
			console.warn("Failed to create Discord event", response.status);
			return false;
		}

		return response.ok;
	} catch (error) {
		console.error("Error creating Discord event:", error);

		return false;
	}
};

export default createDiscordEvent;
