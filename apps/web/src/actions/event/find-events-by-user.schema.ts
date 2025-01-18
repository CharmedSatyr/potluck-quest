import { userId } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	createdBy: userId,
}) satisfies z.ZodType<Pick<PotluckEvent, "createdBy">>;
