import {
	description,
	userId,
	location,
	title,
	startUtcMs,
	endUtcMs,
	hosts,
	z,
} from "@potluck/utilities/validation";

export const schema = z.strictObject({
	createdBy: userId,
	description,
	endUtcMs,
	hosts,
	location,
	startUtcMs,
	title,
}) satisfies z.ZodType<EventUserValues>;
