import { SupportedTimezone } from "@potluck/shared/types";
import { timezone, userId } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	timezone: timezone as z.ZodEnum<SupportedTimezones>,
	userId,
}) satisfies z.ZodType<{
	timezone: SupportedTimezone;
	userId: User["id"];
}>;
