import { z } from "zod";
import { code } from "~/validation/code.js";
import { description } from "~/validation/description.js";
import { discordUserId } from "~/validation/discord-user-id.js";
import { endUtcMs } from "~/validation/end-utc-ms.js";
import { location } from "~/validation/location.js";
import { startUtcMs } from "~/validation/start-utc-ms.js";
import { title } from "~/validation/title.js";

export const postSchema = z.strictObject({
	description,
	discordUserId,
	endUtcMs,
	location,
	startUtcMs,
	title,
});

export const putSchema = z.strictObject({
	code,
	description: description.optional(),
	endUtcMs: endUtcMs.optional(),
	location: location.optional(),
	startUtcMs: startUtcMs.optional(),
	title: title.optional(),
});

export const deleteSchema = z.strictObject({ code });
