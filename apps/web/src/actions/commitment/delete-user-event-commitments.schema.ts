import { code, userId } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	createdBy: userId,
	code,
}) satisfies z.ZodType<{
	createdBy: Commitment["createdBy"];
	code: PotluckEvent["code"];
}>;
