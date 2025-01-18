import { z } from "zod";
import {
	webDeleteBotEventSchema,
	webPostBotEventSchema,
	webPutBotEventSchema,
} from "~/validation/api/web/bot-event.js";
import { webPostBotMappingSchema } from "~/validation/api/web/bot-mapping.js";
import { webGetBotUser } from "~/validation/api/web/bot-user.js";
import { code } from "~/validation/code.js";
import { description } from "~/validation/description.js";
import { discordEventId } from "~/validation/discord-event-id.js";
import { discordGuildId } from "~/validation/discord-guild-id.js";
import { discordUserId } from "~/validation/discord-user-id.js";
import { endUtcMs } from "~/validation/end-utc-ms.js";
import { hosts } from "~/validation/hosts.js";
import { location } from "~/validation/location.js";
import { slot } from "~/validation/slot.js";
import { startDate } from "~/validation/start-date.js";
import { startTime } from "~/validation/start-time.js";
import { startUtcMs } from "~/validation/start-utc-ms.js";
import { suggestions } from "~/validation/suggestions.js";
import { timezone } from "~/validation/timezone.js";
import { title } from "~/validation/title.js";
import { userId } from "~/validation/user-id.js";

export {
	code,
	description,
	discordEventId,
	discordGuildId,
	discordUserId,
	endUtcMs,
	hosts,
	location,
	slot,
	startDate,
	startTime,
	startUtcMs,
	suggestions,
	timezone,
	title,
	userId,
	webDeleteBotEventSchema,
	webGetBotUser,
	webPostBotEventSchema,
	webPutBotEventSchema,
	webPostBotMappingSchema,
	z,
};
