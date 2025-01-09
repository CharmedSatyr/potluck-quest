import { z } from "zod";
import { description } from "~/validation/description.schema";
import { endUtcMs } from "~/validation/endUtcMs.schema";
import { hosts } from "~/validation/hosts.schema";
import { location } from "~/validation/location.schema";
import { startUtcMs } from "~/validation/startUtcMs.schema";
import { title } from "~/validation/title.schema";
import { userId } from "~/validation/userId";

export const schema = z
	.strictObject({
		createdBy: userId,
		description,
		endUtcMs,
		hosts,
		location,
		startUtcMs,
		title,
	})
	.required() satisfies z.ZodType<EventUserValues>;
