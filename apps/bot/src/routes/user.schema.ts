import { discordUserId, z } from "@potluck/shared/validation";

export const getUserGuildsSchema = z.strictObject({
	discordUserId,
});
