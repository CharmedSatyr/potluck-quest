import { code } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
}) satisfies z.ZodType<{ code: PotluckEvent["code"] }>;
