import { code } from "@potluck/validation";
import { userId } from "@potluck/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
	createdBy: userId,
}) satisfies z.ZodType<{
	code: PotluckEvent["code"];
	createdBy: Rsvp["createdBy"];
}>;
