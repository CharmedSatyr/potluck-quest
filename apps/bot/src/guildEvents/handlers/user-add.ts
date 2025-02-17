import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
	User,
} from "discord.js";
import { upsertRsvp } from "~/services/web.js";

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

	const discordInterestedCount =
		event.userCount ?? (await event.fetch()).userCount ?? 0;

	const result = await upsertRsvp({
		discordEventId: event.id,
		discordInterestedCount,
		discordUserId: user.id,
		message: "",
		response: "yes",
	});

	if (!result) {
		console.error("Failed to add rsvp for event:", event.id);
	}
};
