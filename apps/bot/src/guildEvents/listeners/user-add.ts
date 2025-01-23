import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
	User,
} from "discord.js";
import type { GuildScheduledEventUserHandler } from "~/@types/handler.d.ts";

export const listener = async (
	event:
		| GuildScheduledEvent<GuildScheduledEventStatus>
		| PartialGuildScheduledEvent,
	user: User
) => {
	const eventName = Events.GuildScheduledEventUserAdd;

	const handler = event.client.handlers.get(eventName);

	if (!handler) {
		console.error(`No guild event name matching ${eventName} was found.`);
		return;
	}

	try {
		await (handler as GuildScheduledEventUserHandler).execute(event, user);
	} catch (error) {
		console.error(error);
	}
};
