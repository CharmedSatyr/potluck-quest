import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
} from "discord.js";
import type { GuildScheduledEventUpdateHandler } from "~/@types/handler.d.ts";
import config from "~/constants/env-config.js";

export const listener = async (
	oldGuildScheduledEvent:
		| GuildScheduledEvent<GuildScheduledEventStatus>
		| PartialGuildScheduledEvent
		| null,
	newGuildScheduledEvent: GuildScheduledEvent<GuildScheduledEventStatus>
) => {
	if (newGuildScheduledEvent.creatorId !== config.CLIENT_ID) {
		return;
	}

	const eventName = Events.GuildScheduledEventUpdate;

	const handler = newGuildScheduledEvent.client.handlers.get(eventName);

	if (!handler) {
		console.error(`No guild event name matching ${eventName} was found.`);
		return;
	}

	try {
		await (handler as GuildScheduledEventUpdateHandler).execute(
			oldGuildScheduledEvent,
			newGuildScheduledEvent
		);
	} catch (error) {
		console.error(error);
	}
};
