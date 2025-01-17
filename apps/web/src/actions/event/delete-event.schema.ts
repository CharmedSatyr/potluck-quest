import { code } from "@potluck/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
}) satisfies z.ZodType<Pick<PotluckEvent, "code">>;
