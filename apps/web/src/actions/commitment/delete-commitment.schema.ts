import { userId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	createdBy: userId,
	id: z.string().trim().uuid(),
}) satisfies z.ZodType<Pick<Commitment, "createdBy" | "id">>;
