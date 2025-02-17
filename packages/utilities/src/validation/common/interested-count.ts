import { z } from "zod";

export const interestedCount = z.coerce.number().int().gte(0);
