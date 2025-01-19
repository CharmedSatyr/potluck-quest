"use server";

import { botApi } from "@potluck/utilities/validation";
import { z } from "zod";
import botRoutes from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const updateDiscordEvent = async (
	data: z.infer<typeof botApi.event.putSchema>
): Promise<boolean> => {
	try {
		botApi.event.putSchema.parse(data);

		const headers = new Headers({
			"Content-Type": "application/json",
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const response = await fetch(botRoutes.event, {
			body: JSON.stringify(data),
			method: "PUT",
			headers,
		});

		if (!response.ok) {
			console.warn("Failed to update Discord event", response.status);
			return false;
		}

		return response.ok;
	} catch (error) {
		console.error("Error updating Discord event:", error);

		return false;
	}
};

export default updateDiscordEvent;
