import { z } from "zod";
import botApi from "~/validation/bot/api/index.js";
import { code } from "~/validation/common/code.js";
import { commitmentDescription } from "~/validation/common/commitment-description.js";
import { description } from "~/validation/common/description.js";
import { discordEventId } from "~/validation/common/discord-event-id.js";
import { discordGuildId } from "~/validation/common/discord-guild-id.js";
import { discordInterestedCount } from "~/validation/common/discord-interested-count.js";
import { discordUserId } from "~/validation/common/discord-user-id.js";
import { endUtcMs } from "~/validation/common/end-utc-ms.js";
import { hosts } from "~/validation/common/hosts.js";
import { imageUrl } from "~/validation/common/image-url.js";
import { location } from "~/validation/common/location.js";
import { message } from "~/validation/common/message.js";
import { quantity } from "~/validation/common/quantity.js";
import { response } from "~/validation/common/response.js";
import { slotId } from "~/validation/common/slot-id.js";
import { slot } from "~/validation/common/slot.js";
import { startDate } from "~/validation/common/start-date.js";
import { startTime } from "~/validation/common/start-time.js";
import { startUtcMs } from "~/validation/common/start-utc-ms.js";
import { suggestions } from "~/validation/common/suggestions.js";
import { timezone } from "~/validation/common/timezone.js";
import { title } from "~/validation/common/title.js";
import { userId } from "~/validation/common/user-id.js";
import webApiBot from "~/validation/web/api/bot/index.js";

export {
	botApi,
	code,
	commitmentDescription,
	description,
	discordEventId,
	discordGuildId,
	discordUserId,
	endUtcMs,
	hosts,
	imageUrl,
	discordInterestedCount,
	location,
	message,
	response,
	quantity,
	slot,
	slotId,
	startDate,
	startTime,
	startUtcMs,
	suggestions,
	timezone,
	title,
	userId,
	webApiBot,
	z,
};
