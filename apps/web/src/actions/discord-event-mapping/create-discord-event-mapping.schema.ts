import {
	code,
	discordEventId,
	discordGuildId,
	z,
} from "@potluck/utilities/validation";

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
