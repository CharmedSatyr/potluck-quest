import { z } from "zod";
import { timezone } from "~/validation/timezone.schema";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		timezone,
		userId,
	})
	.required() satisfies z.ZodType<{
	timezone: SupportedTimezone;
	userId: User["id"];
}>;
