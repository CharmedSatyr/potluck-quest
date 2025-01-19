import { z } from "zod";
import { code } from "~/validation/common/code.js";
import { discordEventId } from "~/validation/common/discord-event-id.js";
import { discordGuildId } from "~/validation/common/discord-guild-id.js";

export const postSchema = z.strictObject({
	discordGuildId,
	discordEventId,
	potluckEventCode: code,
});
