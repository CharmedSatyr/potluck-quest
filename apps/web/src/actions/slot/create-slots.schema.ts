import { code } from "@potluck/utilities/validation";
import { slot } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	code,
	slots: z.array(slot).nonempty(),
}) satisfies z.ZodType<{
	code: PotluckEvent["code"];
	slots: SlotData[];
}>;
