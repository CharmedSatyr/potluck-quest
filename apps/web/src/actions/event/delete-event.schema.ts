import { code, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	code,
}) satisfies z.ZodType<Pick<PotluckEvent, "code">>;
