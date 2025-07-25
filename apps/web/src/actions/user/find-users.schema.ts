import { userId } from "@potluck/utilities/validation";
import { z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	users: userId.array().nonempty(),
}) satisfies z.ZodType<{ users: User["id"][] }>;
