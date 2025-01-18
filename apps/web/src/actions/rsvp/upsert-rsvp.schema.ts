import { code } from "@potluck/utilities/validation";
import { userId } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code: code,
	createdBy: userId,
	message: z.string().trim().max(256),
	response: z.enum(["yes", "no"]),
}) satisfies z.ZodType<{
	code: PotluckEvent["code"];
	createdBy: User["id"];
	message: Rsvp["message"];
	response: Rsvp["response"];
}>;
