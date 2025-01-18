import { z } from "zod";
import { code, discordEventId, discordGuildId } from "~/validation/index.js";

export const postSchema = z.strictObject({
	discordGuildId,
	discordEventId,
	potluckEventCode: code,
});
