import { z } from "zod";

export const discordEventId = z.string().trim().max(19);
