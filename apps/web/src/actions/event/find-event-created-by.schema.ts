import { code } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
}) satisfies z.ZodType<Pick<PotluckEvent, "code">>;
