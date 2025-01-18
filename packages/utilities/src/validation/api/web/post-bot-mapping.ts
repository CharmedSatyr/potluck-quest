import { z } from "zod";
import { code, discordEventId, discordGuildId } from "~/validation/index.js";

export const webApiPostBotMappingSchema = z.strictObject({
	discordGuildId,
	discordEventId,
	potluckEventCode: code,
});
