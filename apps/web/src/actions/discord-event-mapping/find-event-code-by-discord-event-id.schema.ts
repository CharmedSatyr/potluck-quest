import { discordEventId } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	discordEventId,
}) satisfies z.ZodType<{ discordEventId: DiscordEventMapping["id"] }>;
