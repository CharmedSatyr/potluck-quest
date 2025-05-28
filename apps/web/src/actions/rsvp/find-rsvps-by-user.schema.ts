import { userId } from "@potluck/utilities/validation";
import { z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	id: userId,
}) satisfies z.ZodType<{ id: User["id"] }>;
