import { code } from "@potluck/utilities/validation";
import { z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	code,
}) satisfies z.ZodType<{ code: PotluckEvent["code"] }>;
