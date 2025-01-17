import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
} from "discord.js";
import { updateEvent, UpdateEventData } from "~/services/potluck-quest.js";
import { removeBlurbTruncateAndGetCode } from "~/utilities/description-blurb.js";

export const data = { eventName: Events.GuildScheduledEventUpdate };

export const execute = async (
	oldGuildScheduledEvent:
		| GuildScheduledEvent<GuildScheduledEventStatus>
		| PartialGuildScheduledEvent
		| null,
	newGuildScheduledEvent:
		| GuildScheduledEvent<GuildScheduledEventStatus>
		| PartialGuildScheduledEvent
) => {
	if (newGuildScheduledEvent.isCanceled()) {
		console.warn("Event is not active");
		return;
	}

	const { code, description: cleanedTruncatedDescription } =
		removeBlurbTruncateAndGetCode(newGuildScheduledEvent.description);

	if (!code) {
		console.error("Failed to retrieve code from description on event update");
		return;
	}

	const update: UpdateEventData = {
		code,
	};

	if (
		newGuildScheduledEvent.name &&
		oldGuildScheduledEvent?.name !== newGuildScheduledEvent.name
	) {
		update.title = newGuildScheduledEvent.name;
	}

	if (
		newGuildScheduledEvent.description &&
		oldGuildScheduledEvent?.description !== newGuildScheduledEvent.description
	) {
		update.description = cleanedTruncatedDescription;
	}

	if (
		newGuildScheduledEvent.entityMetadata?.location &&
		oldGuildScheduledEvent?.entityMetadata?.location !==
			newGuildScheduledEvent.entityMetadata?.location
	) {
		update.location = newGuildScheduledEvent.entityMetadata.location;
	}

	if (
		newGuildScheduledEvent.scheduledStartTimestamp &&
		oldGuildScheduledEvent?.scheduledStartTimestamp !==
			newGuildScheduledEvent.scheduledStartTimestamp
	) {
		update.startUtcMs = newGuildScheduledEvent.scheduledStartTimestamp;
	}

	if (
		newGuildScheduledEvent.scheduledEndTimestamp &&
		oldGuildScheduledEvent?.scheduledEndTimestamp !==
			newGuildScheduledEvent.scheduledEndTimestamp
	) {
		update.endUtcMs = newGuildScheduledEvent.scheduledEndTimestamp;
	}

	if (Object.keys(update).length <= 1) {
		return;
	}

	updateEvent(update);
};
