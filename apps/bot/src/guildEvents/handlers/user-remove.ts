import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
	User,
} from "discord.js";
import { upsertRsvp } from "~/services/potluck-quest";
import { removeBlurbTruncateAndGetCode } from "~/utilities/description-blurb";

export const data = { eventName: Events.GuildScheduledEventUserRemove };

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

	const { code } = removeBlurbTruncateAndGetCode(event.description);

	if (!code) {
		console.error("Failed to retrieve code from description on event user add");
		return;
	}

	const result = await upsertRsvp({
		code,
		discordUserId: user.id,
		message: "",
		response: "no",
	});

	if (!result) {
		console.error("Failed to remove rsvp for event:", code);
	}
};
