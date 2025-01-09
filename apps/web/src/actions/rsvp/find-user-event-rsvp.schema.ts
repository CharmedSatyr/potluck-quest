import { z } from "zod";
import { code } from "~/validation/code.schema";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		code,
		createdBy: userId,
	})
	.required() satisfies z.ZodType<{
	code: PotluckEvent["code"];
	createdBy: Rsvp["createdBy"];
}>;
