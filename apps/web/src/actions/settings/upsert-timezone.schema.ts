import { userId } from "@potluck/validation";
import { timezone } from "@potluck/validation";
import { z } from "zod";

export const schema = z
	.strictObject({
		timezone,
		userId,
	})
	.required() satisfies z.ZodType<{
	timezone: SupportedTimezone;
	userId: User["id"];
}>;
