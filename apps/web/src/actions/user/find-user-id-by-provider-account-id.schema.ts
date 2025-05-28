import { z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	providerAccountId: z.string().trim().min(1),
}) satisfies z.ZodType<{
	providerAccountId: Account["providerAccountId"];
}>;
