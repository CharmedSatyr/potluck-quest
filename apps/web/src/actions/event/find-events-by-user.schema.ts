import { z } from "zod";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		createdBy: userId,
	})
	.required() satisfies z.ZodType<Pick<PotluckEvent, "createdBy">>;
