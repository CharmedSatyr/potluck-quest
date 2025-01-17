import { userId } from "@potluck/validation";
import { z } from "zod";

export const schema = z.strictObject({
	users: userId.array().nonempty(),
}) satisfies z.ZodType<{ users: User["id"][] }>;
