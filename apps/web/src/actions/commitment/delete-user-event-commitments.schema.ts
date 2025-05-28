import { code, userId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	createdBy: userId,
	code,
}) satisfies z.ZodType<{
	createdBy: Commitment["createdBy"];
	code: PotluckEvent["code"];
}>;
