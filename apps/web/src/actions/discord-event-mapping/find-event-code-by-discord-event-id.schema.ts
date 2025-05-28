import { discordEventId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	discordEventId,
}) satisfies z.ZodType<{ discordEventId: DiscordEventMapping["id"] }>;
