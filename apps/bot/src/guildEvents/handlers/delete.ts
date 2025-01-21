import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
} from "discord.js";
import { deletePotluckEvent } from "~/services/web.js";

export const data = { eventName: Events.GuildScheduledEventDelete };

/**
 * TODO: This event is fired after an event is deleted from PQ web,
 * in which case it should not call PQ to delete again.
 */
export const execute = async (
	guildScheduledEvent:
		| GuildScheduledEvent<GuildScheduledEventStatus>
		| PartialGuildScheduledEvent
		| null
) => {
	if (guildScheduledEvent?.isCanceled()) {
		console.warn("Event is not active");
		return;
	}

	if (!guildScheduledEvent?.id) {
		console.warn("Failed to retrieve guild scheduled event ID on event delete");
		return;
	}

	console.info("Deleting event", guildScheduledEvent.id);

	await deletePotluckEvent({ discordEventId: guildScheduledEvent.id });
};
