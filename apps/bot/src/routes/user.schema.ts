import { discordUserId, z } from "@potluck/validation";

export const getUserGuildsSchema = z.strictObject({
	discordUserId,
});
