import { discordGuildId } from "@potluck/validation";
import { z } from "zod";
import { createEventSchema } from "~/services/discord.schema";

export const postEventSchema = createEventSchema;

export const getEventMetadataSchema = z.strictObject({
	discordGuildId,
	memberId: z.string().trim().min(1).max(30),
});
