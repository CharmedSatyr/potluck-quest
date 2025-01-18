import { discordUserId, z } from "@potluck/utilities/validation";

export const getUserGuildsSchema = z.strictObject({
	discordUserId,
});
