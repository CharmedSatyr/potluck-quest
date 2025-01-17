import { code } from "@potluck/validation";
import { description } from "@potluck/validation";
import { location } from "@potluck/validation";
import { title } from "@potluck/validation";
import { startUtcMs } from "@potluck/validation";
import { endUtcMs } from "@potluck/validation";
import { hosts } from "@potluck/validation";
import { z } from "zod";

const currentDate = new Date();
const futureDate = new Date(currentDate);
futureDate.setFullYear(futureDate.getFullYear() + 1);

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
