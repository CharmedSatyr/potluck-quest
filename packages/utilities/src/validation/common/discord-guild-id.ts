import { z } from "zod";

export const discordGuildId = z.string().trim().max(19);
