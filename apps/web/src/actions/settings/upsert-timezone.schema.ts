import { SupportedTimezone } from "@potluck/utilities/types";
import { timezone, userId } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	timezone,
	userId,
	// Coerced because timezone type improperly inferred
}) as z.ZodType<{
	timezone: SupportedTimezone;
	userId: User["id"];
}>;
