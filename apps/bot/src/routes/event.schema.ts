import { discordGuildId, discordUserId, z } from "@potluck/validation";
import { createEventSchema } from "~/services/discord.schema";

export const postEventSchema = createEventSchema;

export const getEventMetadataSchema = z.strictObject({
	discordGuildId,
	discordUserId,
});
