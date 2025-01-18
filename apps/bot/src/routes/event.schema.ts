import {
	discordGuildId,
	discordUserId,
	z,
} from "@potluck/utilities/validation";
import { createDiscordEventSchema } from "~/services/discord.schema.js";

export const postEventSchema = createDiscordEventSchema;

export const getEventMetadataSchema = z.strictObject({
	discordGuildId,
	discordUserId,
});
