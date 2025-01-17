import { userId } from "@potluck/validation";
import { z } from "zod";

export const schema = z
	.strictObject({
		createdBy: userId,
	})
	.required() satisfies z.ZodType<Pick<PotluckEvent, "createdBy">>;
