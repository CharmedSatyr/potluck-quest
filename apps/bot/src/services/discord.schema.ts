import {
	description,
	location,
	title,
	startUtcMs,
	endUtcMs,
	discordGuildId,
} from "@potluck/validation";
import { z } from "zod";

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
