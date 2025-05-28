import { userId } from "@potluck/utilities/validation";
import { z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	userId,
}) satisfies z.ZodType<{
	userId: Account["userId"];
}>;
