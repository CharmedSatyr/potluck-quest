import { z } from "zod";

export const slotId = z.string().trim().uuid();
