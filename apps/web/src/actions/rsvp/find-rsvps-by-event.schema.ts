import { code } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	eventCode: code,
}) satisfies z.ZodType<{ eventCode: PotluckEvent["code"] }>;
