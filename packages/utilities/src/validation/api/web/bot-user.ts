import { z } from "zod";
import { discordUserId } from "~/validation/index.js";

export const webGetBotUser = z.strictObject({
	providerAccountId: discordUserId,
});
