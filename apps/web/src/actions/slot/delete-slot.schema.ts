import { z } from "@potluck/utilities/validation";

export const schema = z.strictObject({
	id: z.string().trim().uuid(),
}) satisfies z.ZodType<Pick<Slot, "id">>;
