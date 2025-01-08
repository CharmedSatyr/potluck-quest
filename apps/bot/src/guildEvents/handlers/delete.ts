import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
} from "discord.js";
import { deleteEvent } from "~/services/potluck-quest";
import { removeBlurbAndGetCode } from "~/utilities/description-blurb";

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

	const { code } = removeBlurbAndGetCode(
		guildScheduledEvent?.description ?? null
	);

	if (!code) {
		console.error("Failed to retrieve code from description on event delete");
		return;
	}

	console.info("Deleting event", code);

	await deleteEvent({ code });
};
