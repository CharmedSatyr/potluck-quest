import { z } from "zod";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		users: userId.array().nonempty(),
	})
	.required() satisfies z.ZodType<{ users: User["id"][] }>;
