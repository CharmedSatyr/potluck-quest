"use server";

import { botApi } from "@potluck/utilities/validation";
import findDiscordEventMapping from "~/actions/discord-event-mapping/find-discord-event-mapping";
import botRoutes from "~/constants/bot-api";
import envConfig from "~/constants/env-config";

const deleteDiscordEvent = async ({
	code,
}: {
	code: PotluckEvent["code"];
}): Promise<void> => {
	try {
		const [mapping] = await findDiscordEventMapping({ code });

		if (!mapping) {
			return;
		}

		const data = {
			guildId: mapping.discordGuildId,
			eventId: mapping.discordEventId,
		};
		const params = new URLSearchParams(data);

		botApi.event.deleteSchema.parse(data);

		const headers = new Headers({
			"Content-Type": "application/json",
			"x-api-key": envConfig.PQ_WEB_TO_BOT_API_KEY,
		});

		const response = await fetch(
			botRoutes.event.concat("?").concat(params.toString()),
			{
				headers,
				method: "DELETE",
			}
		);

		if (!response.ok) {
			console.warn("Failed to delete Discord event", response.status);
			return;
		}
	} catch (error) {
		console.error("Error deleting Discord event:", error);
	}
};

export default deleteDiscordEvent;
