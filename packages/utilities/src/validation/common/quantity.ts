import { z } from "zod";

export const quantity = z.coerce.number().min(1).max(256);
