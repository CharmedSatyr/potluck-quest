import type { SupportedTimezone } from "@potluck/utilities/types";
import { timezone, userId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	timezone, //
	userId,
}) as z.ZodType<{
	timezone: SupportedTimezone;
	userId: User["id"];
}>; // o
