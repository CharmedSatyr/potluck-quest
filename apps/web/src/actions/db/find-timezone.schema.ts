import { z } from "zod";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({ userId })
	.required() satisfies z.ZodType<{ userId: User["id"] }>;
