import {
	commitmentDescription,
	quantity,
	slotId,
} from "@potluck/utilities/validation";
import { userId } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	createdBy: userId,
	description: commitmentDescription,
	quantity,
	slotId,
}) satisfies z.ZodType<
	Pick<Commitment, "createdBy" | "description" | "quantity" | "slotId">
>;
