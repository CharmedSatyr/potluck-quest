import { z } from "zod";
import { SLOT_COUNT_MAX } from "~/constants/index.js";

export const quantity = z.coerce.number().min(1).max(SLOT_COUNT_MAX);
