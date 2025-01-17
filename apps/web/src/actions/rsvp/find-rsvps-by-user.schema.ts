import { userId } from "@potluck/validation";
import { z } from "zod";

export const schema = z
	.strictObject({
		id: userId,
	})
	.required() satisfies z.ZodType<{ id: User["id"] }>;
