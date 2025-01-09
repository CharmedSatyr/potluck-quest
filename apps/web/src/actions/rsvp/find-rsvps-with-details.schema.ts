import { z } from "zod";
import { code } from "~/validation/code.schema";

export const schema = z
	.strictObject({
		code,
	})
	.required() satisfies z.ZodType<{ code: PotluckEvent["code"] }>;
