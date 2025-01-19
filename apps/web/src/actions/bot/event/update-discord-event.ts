"use server";

import { botApi } from "@potluck/utilities/validation";
import findDiscordEventMapping from "~/actions/discord-event-mapping/find-discord-event-mapping";
import botRoutes from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const updateDiscordEvent = async (
	code: string,
	update: Partial<EventData>
): Promise<void> => {
	try {
		const [mapping] = await findDiscordEventMapping({ code });

		if (!mapping) {
			return;
		}

		const data = {
			guildId: mapping.discordGuildId,
			eventId: mapping.discordEventId,
			...update,
		};

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
			return;
		}

		return;
	} catch (error) {
		console.error("Error updating Discord event:", error);
	}
};

export default updateDiscordEvent;
