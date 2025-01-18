import { z } from "zod";
import {
	code,
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

export const webApiPutBotEventSchema = z.strictObject({
	code,
	description: description.optional(),
	endUtcMs: endUtcMs.optional(),
	location: location.optional(),
	startUtcMs: startUtcMs.optional(),
	title: title.optional(),
});

export const webApiDeleteBotEventSchema = z.strictObject({ code });
