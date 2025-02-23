import { z } from "zod";
import { SLOT_COUNT_MAX, SLOT_ITEM_LENGTH } from "~/constants/index.js";

export const slot = z
	.strictObject({
		count: z.coerce.number().min(1).max(SLOT_COUNT_MAX),
		id: z.string().uuid().optional(),
		item: z.string().trim().min(1).max(SLOT_ITEM_LENGTH),
		order: z.coerce.number().min(1),
	})
	.strip();
