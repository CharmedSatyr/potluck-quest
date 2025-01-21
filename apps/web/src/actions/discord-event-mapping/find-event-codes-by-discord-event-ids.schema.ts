import { discordEventId } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	discordEventIds: z.array(discordEventId).nonempty(),
}) satisfies z.ZodType<{ discordEventIds: DiscordEventMapping["id"][] }>;
