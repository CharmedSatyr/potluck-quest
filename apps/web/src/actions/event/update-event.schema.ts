import { code } from "@potluck/utilities/validation";
import { description } from "@potluck/utilities/validation";
import { location } from "@potluck/utilities/validation";
import { title } from "@potluck/utilities/validation";
import { startUtcMs } from "@potluck/utilities/validation";
import { endUtcMs } from "@potluck/utilities/validation";
import { hosts } from "@potluck/utilities/validation";
import { z } from "@potluck/utilities/validation";

export const schema = z
	.strictObject({
		code,
		description: description.optional(),
		endUtcMs: endUtcMs.optional(),
		hosts: hosts.optional(),
		location: location.optional(),
		startUtcMs: startUtcMs.optional(),
		title: title.optional(),
	})
	.refine((data) => Object.values(data).length > 1, {
		message: "No changes detected",
	}) satisfies z.ZodType<
	Partial<EventUserValues> & Required<Pick<PotluckEvent, "code">>
>;
