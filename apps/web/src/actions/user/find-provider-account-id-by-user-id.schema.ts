import { userId } from "@potluck/validation";
import { z } from "zod";

export const schema = z
	.strictObject({
		userId,
	})
	.required() satisfies z.ZodType<{
	userId: Account["userId"];
}>;
