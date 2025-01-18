import { z } from "zod";
import { discordUserId } from "~/validation/common/discord-user-id.js";

export const getSchema = z.strictObject({ discordUserId });
