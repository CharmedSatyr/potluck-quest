import { z } from "zod";

export const schema = z.strictObject({
	providerAccountId: z.string().trim().min(1),
}) satisfies z.ZodType<{
	providerAccountId: Account["providerAccountId"];
}>;
