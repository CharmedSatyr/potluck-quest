import { z } from "zod";
import { code } from "~/validation/code.schema";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		code: code,
		createdBy: userId,
		message: z.string().trim().max(256),
		response: z.enum(["yes", "no"]),
	})
	.required() satisfies z.ZodType<{
	code: PotluckEvent["code"];
	createdBy: User["id"];
	message: Rsvp["message"];
	response: Rsvp["response"];
}>;
