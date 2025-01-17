import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
} from "discord.js";
import { deleteEvent } from "~/services/potluck-quest.js";
import { removeBlurbTruncateAndGetCode } from "~/utilities/description-blurb.js";

export const data = { eventName: Events.GuildScheduledEventDelete };

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

	await deleteEvent({ code });
};
