import { code, discordEventId, discordGuildId } from "@potluck/validation";
import { z } from "zod";

export const schema = z.strictObject({
	discordEventId,
	discordGuildId,
	potluckEventCode: code,
}) satisfies z.ZodType<
	Pick<
		DiscordEventMapping,
		"discordEventId" | "discordGuildId" | "potluckEventCode"
	>
>;
