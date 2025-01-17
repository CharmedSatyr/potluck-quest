import { code } from "@potluck/shared/validation";
import { description } from "@potluck/shared/validation";
import { location } from "@potluck/shared/validation";
import { title } from "@potluck/shared/validation";
import { startUtcMs } from "@potluck/shared/validation";
import { endUtcMs } from "@potluck/shared/validation";
import { hosts } from "@potluck/shared/validation";
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
