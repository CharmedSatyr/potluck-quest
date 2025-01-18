import { z } from "zod";
import { discordUserId } from "~/validation/discord-user-id.js";

export const getSchema = z.strictObject({ discordUserId });
