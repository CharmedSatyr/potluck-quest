import {
	code,
	description,
	discordUserId,
	discordGuildId,
	discordEventId,
	endUtcMs,
	location,
	startUtcMs,
	title,
	z,
} from "@potluck/shared/validation";

export const createPotluckEventSchema = z.strictObject({
	description,
	discordUserId,
	endUtcMs,
	location,
	startUtcMs,
	title,
});

export const mapDiscordToPotluckEventSchema = z.strictObject({
	discordGuildId,
	discordEventId,
	potluckEventCode: code,
});
