import { z } from "zod";
import { code, discordEventId, discordGuildId } from "~/validation/index.js";

export const webPostBotMappingSchema = z.strictObject({
	discordGuildId,
	discordEventId,
	potluckEventCode: code,
});
