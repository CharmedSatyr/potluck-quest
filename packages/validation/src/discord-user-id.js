import { z } from "zod";

export const discordUserId = z.string().trim().min(1).max(30);
