import {
	Events,
	GuildScheduledEvent,
	GuildScheduledEventStatus,
	PartialGuildScheduledEvent,
	User,
} from "discord.js";
import { upsertRsvp } from "~/services/potluck-quest.js";
import { removeBlurbTruncateAndGetCode } from "~/utilities/description-blurb.js";

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

	const { code } = removeBlurbTruncateAndGetCode(event.description);

	if (!code) {
		console.error("Failed to retrieve code from description on event user add");
		return;
	}

	const result = await upsertRsvp({
		code,
		discordUserId: user.id,
		message: "",
		response: "yes",
	});

	if (!result) {
		console.error("Failed to add rsvp for event:", code);
	}
};
