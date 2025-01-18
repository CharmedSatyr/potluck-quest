import { z } from "zod";
import {
	description,
	discordUserId,
	endUtcMs,
	location,
	startUtcMs,
	title,
} from "~/validation/index.js";

export const webApiPostBotEventSchema = z.strictObject({
	description,
	discordUserId,
	endUtcMs,
	location,
	startUtcMs,
	title,
});
