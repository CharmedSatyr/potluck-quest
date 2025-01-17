import { userId } from "@potluck/validation";
import { z } from "zod";

export const schema = z
	.strictObject({
		createdBy: userId,
		id: z.string().trim().uuid(),
	})
	.required() satisfies z.ZodType<Pick<Commitment, "createdBy" | "id">>;
