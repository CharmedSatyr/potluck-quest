import { userId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	id: userId,
}) satisfies z.ZodType<{ id: User["id"] }>;
