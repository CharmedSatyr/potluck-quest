import { z } from "zod";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		id: userId,
	})
	.required() satisfies z.ZodType<{ id: User["id"] }>;
