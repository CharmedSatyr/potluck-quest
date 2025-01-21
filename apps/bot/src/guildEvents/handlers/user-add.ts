import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
	User,
} from "discord.js";
import { upsertRsvp } from "~/services/potluck-quest.js";

export const data = { eventName: Events.GuildScheduledEventUserAdd };

export const execute = async (
	event:
		| GuildScheduledEvent<GuildScheduledEventStatus>
		| PartialGuildScheduledEvent,
	user: User
) => {
	if (event.isCanceled()) {
		console.warn("Event is not active");
		return;
	}

	if (!event.id) {
		console.warn(
			"Failed to retrieve guild scheduled event ID on event user add"
		);
		return;
	}

	const result = await upsertRsvp({
		discordEventId: event.id,
		discordUserId: user.id,
		message: "",
		response: "yes",
	});

	if (!result) {
		console.error("Failed to add rsvp for event:", event.id);
	}
};
