import { code } from "@potluck/shared/validation";
import { userId } from "@potluck/shared/validation";
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
