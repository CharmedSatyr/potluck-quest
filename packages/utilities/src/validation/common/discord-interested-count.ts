import { z } from "zod";

export const discordInterestedCount = z.coerce.number().int().gte(0);
