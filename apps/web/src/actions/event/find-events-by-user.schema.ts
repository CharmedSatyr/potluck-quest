import { userId } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	createdBy: userId,
}) satisfies z.ZodType<Pick<PotluckEvent, "createdBy">>;
