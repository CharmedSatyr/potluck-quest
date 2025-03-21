import type { SupportedTimezone } from "@potluck/utilities/types";
import { timezone, userId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	timezone,
	userId,
	// TODO: Should be satisfies, but that has caused problems with the pipeline build
}) as z.ZodType<{
	timezone: SupportedTimezone;
	userId: User["id"];
}>;
