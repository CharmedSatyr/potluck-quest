import { z } from "zod";
import { commitmentDescription } from "~/validation/common/commitment-description.js";
import { discordUserId } from "~/validation/common/discord-user-id.js";
import { quantity } from "~/validation/common/quantity.js";
import { slotId } from "~/validation/common/slot-id.js";

export const postSchema = z.strictObject({
	discordUserId,
	description: commitmentDescription,
	quantity,
	slotId,
});
