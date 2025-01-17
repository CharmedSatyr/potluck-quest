import { description } from "@potluck/validation";
import { userId } from "@potluck/validation";
import { z } from "zod";

export const schema = z.strictObject({
	createdBy: userId,
	description,
	quantity: z.coerce.number().positive().max(256),
	slotId: z.string().trim().uuid(),
}) satisfies z.ZodType<
	Pick<Commitment, "createdBy" | "description" | "quantity" | "slotId">
>;
