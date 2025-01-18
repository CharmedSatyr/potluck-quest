import { SupportedTimezone } from "@potluck/shared/types";
import { timezone, userId } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	timezone,
	userId,
	// Coerced because timezone type improperly inferred
}) as z.ZodType<{
	timezone: SupportedTimezone;
	userId: User["id"];
}>;
