import { z } from "zod";

export const message = z.string().trim().max(256);
