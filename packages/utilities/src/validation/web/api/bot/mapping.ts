import { z } from "zod";
import { code } from "~/validation/code.js";
import { discordEventId } from "~/validation/discord-event-id.js";
import { discordGuildId } from "~/validation/discord-guild-id.js";

export const postSchema = z.strictObject({
	discordGuildId,
	discordEventId,
	potluckEventCode: code,
});
