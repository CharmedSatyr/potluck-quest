import { code } from "@potluck/utilities/validation";
import { userId } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
	userId,
}) satisfies z.ZodType<{
	code: PotluckEvent["code"];
	userId: User["id"];
}>;
