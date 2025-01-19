import { userId, z } from "@potluck/utilities/validation";

export const schema = z.strictObject({ userId }) satisfies z.ZodType<{
	userId: User["id"];
}>;
