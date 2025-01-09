import { z } from "zod";
import { description } from "~/validation/description.schema";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		createdBy: userId,
		description,
		quantity: z.coerce.number().positive().max(256),
		slotId: z.string().trim().uuid(),
	})
	.required() satisfies z.ZodType<
	Pick<Commitment, "createdBy" | "description" | "quantity" | "slotId">
>;
