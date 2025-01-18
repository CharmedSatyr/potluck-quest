import { userId } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	id: userId,
}) satisfies z.ZodType<{ id: User["id"] }>;
