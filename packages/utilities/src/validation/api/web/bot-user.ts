import { z } from "zod";
import { discordUserId } from "~/validation/discord-user-id.js";

export const webGetBotUser = z.strictObject({
	providerAccountId: discordUserId,
});
