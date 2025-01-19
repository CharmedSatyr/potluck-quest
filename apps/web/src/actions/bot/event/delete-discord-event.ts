"use server";

import { botApi } from "@potluck/utilities/validation";
import { z } from "zod";
import botRoutes from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const deleteDiscordEvent = async (
	data: z.infer<typeof botApi.event.deleteSchema>
): Promise<boolean> => {
	try {
		botApi.event.deleteSchema.parse(data);

		const headers = new Headers({
			"Content-Type": "application/json",
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const response = await fetch(botRoutes.event, {
			body: JSON.stringify(data),
			method: "DELETE",
			headers,
		});

		if (!response.ok) {
			console.warn("Failed to delete Discord event", response.status);
			return false;
		}

		return response.ok;
	} catch (error) {
		console.error("Error deleting Discord event:", error);

		return false;
	}
};

export default deleteDiscordEvent;
