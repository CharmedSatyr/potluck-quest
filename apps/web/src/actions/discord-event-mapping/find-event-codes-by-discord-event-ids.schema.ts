import { discordEventId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	discordEventIds: z.array(discordEventId).nonempty(),
}) satisfies z.ZodType<{ discordEventIds: DiscordEventMapping["id"][] }>;
