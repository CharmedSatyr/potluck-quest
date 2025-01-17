import {
	description,
	location,
	title,
	startUtcMs,
	endUtcMs,
	discordGuildId,
	z,
} from "@potluck/validation";

export const createEventSchema = z
	.strictObject({
		guildId: discordGuildId,
		description,
		endUtcMs,
		location,
		startUtcMs,
		title,
	})
	.required();
