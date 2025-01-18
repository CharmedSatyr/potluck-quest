import {
	description,
	location,
	title,
	startUtcMs,
	endUtcMs,
	discordGuildId,
	z,
} from "@potluck/utilities/validation";

export const createDiscordEventSchema = z.strictObject({
	guildId: discordGuildId,
	description,
	endUtcMs,
	location,
	startUtcMs,
	title,
});

export const getGuildSchema = z.strictObject({ guildId: discordGuildId });
