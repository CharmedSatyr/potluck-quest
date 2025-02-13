import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
} from "discord.js";
import type { GuildScheduledEventDeleteHandler } from "~/@types/handler.d.ts";
import config from "~/constants/env-config.js";

export const listener = async (
	guildScheduledEvent:
		| GuildScheduledEvent<GuildScheduledEventStatus>
		| PartialGuildScheduledEvent
		| null
) => {
	if (guildScheduledEvent?.creatorId !== config.CLIENT_ID) {
		return;
	}

	const eventName = Events.GuildScheduledEventDelete;

	const handler = guildScheduledEvent?.client.handlers.get(eventName);

	if (!handler) {
		console.error(`No guild event name matching ${eventName} was found.`);
		return;
	}

	try {
		await (handler as GuildScheduledEventDeleteHandler).execute(
			guildScheduledEvent
		);
	} catch (error) {
		console.error(error);
	}
};
