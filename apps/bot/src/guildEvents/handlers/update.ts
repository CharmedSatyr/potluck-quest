import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
} from "discord.js";
import { updateEvent, UpdateEventData } from "~/services/potluck-quest";
import { removeBlurbAndGetCode } from "~/utilities/description-blurb";

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

	const { code, description: cleanedDescription } = removeBlurbAndGetCode(
		newGuildScheduledEvent.description
	);

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
		update.description = cleanedDescription;
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
