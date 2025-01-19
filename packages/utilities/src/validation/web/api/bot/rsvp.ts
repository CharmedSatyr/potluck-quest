import { z } from "zod";
import { code } from "~/validation/common/code.js";
import { discordUserId } from "~/validation/common/discord-user-id.js";
import { message } from "~/validation/common/message.js";
import { response } from "~/validation/common/response.js";

export const postSchema = z.strictObject({
	code,
	discordUserId,
	message,
	response,
});
