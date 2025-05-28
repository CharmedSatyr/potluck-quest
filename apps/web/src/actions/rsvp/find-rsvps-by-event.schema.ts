import { code } from "@potluck/utilities/validation";
import { z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	eventCode: code,
}) satisfies z.ZodType<{ eventCode: PotluckEvent["code"] }>;
