import { z } from "zod";
import { description } from "~/validation/common/description.js";
import { discordEventId } from "~/validation/common/discord-event-id.js";
import { discordGuildId } from "~/validation/common/discord-guild-id.js";
import { discordUserId } from "~/validation/common/discord-user-id.js";
import { endUtcMs } from "~/validation/common/end-utc-ms.js";
import { location } from "~/validation/common/location.js";
import { startUtcMs } from "~/validation/common/start-utc-ms.js";
import { title } from "~/validation/common/title.js";

export const postSchema = z.strictObject({
	guildId: discordGuildId,
	description,
	endUtcMs,
	location,
	startUtcMs,
	title,
});

export const putSchema = z.strictObject({
	description: description.optional(),
	endUtcMs: endUtcMs.optional(),
	eventId: discordEventId,
	guildId: discordGuildId,
	location: location.optional(),
	startUtcMs: startUtcMs.optional(),
	title: title.optional(),
});

export const deleteSchema = z.strictObject({
	guildId: discordGuildId,
	eventId: discordEventId,
});

export const getMetadataSchema = z.strictObject({
	discordGuildId,
	discordUserId,
});
