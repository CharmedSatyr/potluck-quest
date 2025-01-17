import { userId } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	userId,
}) satisfies z.ZodType<{ userId: User["id"] }>;
