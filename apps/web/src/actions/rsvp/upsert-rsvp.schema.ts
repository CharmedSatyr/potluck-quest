import { code, message, response, userId } from "@potluck/utilities/validation";
import { z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	code: code,
	createdBy: userId,
	message,
	response,
}) satisfies z.ZodType<{
	code: PotluckEvent["code"];
	createdBy: User["id"];
	message: Rsvp["message"];
	response: Rsvp["response"];
}>;
