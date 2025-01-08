import { z } from "zod";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		createdBy: userId,
		id: z.string().trim().uuid(),
	})
	.required() satisfies z.ZodType<Pick<Commitment, "createdBy" | "id">>;
