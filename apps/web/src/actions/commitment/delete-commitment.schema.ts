import { userId } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	createdBy: userId,
	id: z.string().trim().uuid(),
}) satisfies z.ZodType<Pick<Commitment, "createdBy" | "id">>;
