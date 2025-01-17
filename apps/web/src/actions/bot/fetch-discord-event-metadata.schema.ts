import { code } from "@potluck/shared/validation";
import { userId } from "@potluck/shared/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
	userId,
}) satisfies z.ZodType<{
	code: PotluckEvent["code"];
	userId: User["id"];
}>;
