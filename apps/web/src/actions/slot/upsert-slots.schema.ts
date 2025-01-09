import { z } from "zod";
import { code } from "~/validation/code.schema";
import { schema as slotSchema } from "~/validation/slot.schema";

export const schema = z
	.strictObject({
		code: code,
		slots: z.array(slotSchema).nonempty(),
	})
	.required() satisfies z.ZodType<{
	code: PotluckEvent["code"];
	slots: SlotData[];
}>;
