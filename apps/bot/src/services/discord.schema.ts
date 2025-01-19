import {
	description,
	location,
	title,
	startUtcMs,
	endUtcMs,
	discordGuildId,
	z,
	discordEventId,
} from "@potluck/utilities/validation";

export const createDiscordEventSchema = z.strictObject({
	guildId: discordGuildId,
	description,
	endUtcMs,
	location,
	startUtcMs,
	title,
});

export const updateDiscordEventSchema = z.strictObject({
	description: description.optional(),
	endUtcMs: endUtcMs.optional(),
	eventId: discordEventId,
	guildId: discordGuildId,
	location: location.optional(),
	startUtcMs: startUtcMs.optional(),
	title: title.optional(),
});

export const cancelDiscordEventSchema = z.strictObject({
	guildId: discordGuildId,
	eventId: discordEventId,
});

export const getGuildSchema = z.strictObject({ guildId: discordGuildId });
