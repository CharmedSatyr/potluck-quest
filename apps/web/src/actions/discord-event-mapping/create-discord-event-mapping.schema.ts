import { z } from "zod";
import { code } from "~/validation/code.schema";

export const schema = z
	.strictObject({
		discordEventId: z.string().trim().max(19),
		discordGuildId: z.string().trim().max(19),
		potluckEventCode: code,
	})
	.required() satisfies z.ZodType<
	Pick<
		DiscordEventMapping,
		"discordEventId" | "discordGuildId" | "potluckEventCode"
	>
>;
