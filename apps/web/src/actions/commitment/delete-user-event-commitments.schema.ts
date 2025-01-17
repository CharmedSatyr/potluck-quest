import { code } from "@potluck/validation";
import { userId } from "@potluck/validation";
import { z } from "zod";

export const schema = z
	.strictObject({
		createdBy: userId,
		code,
	})
	.required() satisfies z.ZodType<{
	createdBy: Commitment["createdBy"];
	code: PotluckEvent["code"];
}>;
