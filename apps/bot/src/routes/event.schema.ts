import { discordGuildId, discordUserId, z } from "@potluck/validation";
import { createDiscordEventSchema } from "~/services/discord.schema";

export const postEventSchema = createDiscordEventSchema;

export const getEventMetadataSchema = z.strictObject({
	discordGuildId,
	discordUserId,
});
