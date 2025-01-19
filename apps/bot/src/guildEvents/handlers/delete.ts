import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
} from "discord.js";
import { deletePotluckEvent } from "~/services/potluck-quest.js";
import { removeBlurbTruncateAndGetCode } from "~/utilities/description-blurb.js";

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

	const { code } = removeBlurbTruncateAndGetCode(
		guildScheduledEvent?.description ?? null
	);

	if (!code) {
		console.error("Failed to retrieve code from description on event delete");
		return;
	}

	console.info("Deleting event", code);

	await deletePotluckEvent({ code });
};
