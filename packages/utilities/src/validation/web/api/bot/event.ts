import { z } from "zod";
import { code } from "~/validation/common/code.js";
import { description } from "~/validation/common/description.js";
import { discordUserId } from "~/validation/common/discord-user-id.js";
import { endUtcMs } from "~/validation/common/end-utc-ms.js";
import { location } from "~/validation/common/location.js";
import { startUtcMs } from "~/validation/common/start-utc-ms.js";
import { title } from "~/validation/common/title.js";

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
