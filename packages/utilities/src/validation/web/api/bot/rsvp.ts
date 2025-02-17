import { z } from "zod";
import { discordEventId } from "~/validation/common/discord-event-id.js";
import { discordInterestedCount } from "~/validation/common/discord-interested-count.js";
import { discordUserId } from "~/validation/common/discord-user-id.js";
import { message } from "~/validation/common/message.js";
import { response } from "~/validation/common/response.js";

export const postSchema = z.strictObject({
	discordEventId,
	discordInterestedCount,
	discordUserId,
	message,
	response,
});
