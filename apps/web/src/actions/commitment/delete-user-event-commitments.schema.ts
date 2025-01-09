import { z } from "zod";
import { code } from "~/validation/code.schema";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		createdBy: userId,
		code,
	})
	.required() satisfies z.ZodType<{
	createdBy: Commitment["createdBy"];
	code: PotluckEvent["code"];
}>;
