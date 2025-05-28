import {
	commitmentDescription,
	quantity,
	slotId,
} from "@potluck/utilities/validation";
import { userId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	createdBy: userId,
	description: commitmentDescription,
	quantity,
	slotId,
}) satisfies z.ZodType<
	Pick<Commitment, "createdBy" | "description" | "quantity" | "slotId">
>;
