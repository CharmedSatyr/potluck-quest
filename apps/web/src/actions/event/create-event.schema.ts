import { description } from "@potluck/utilities/validation";
import { userId } from "@potluck/utilities/validation";
import { location } from "@potluck/utilities/validation";
import { title } from "@potluck/utilities/validation";
import { startUtcMs } from "@potluck/utilities/validation";
import { endUtcMs } from "@potluck/utilities/validation";
import { hosts } from "@potluck/utilities/validation";
import { z } from "zod";

export const schema = z.strictObject({
	createdBy: userId,
	description,
	endUtcMs,
	hosts,
	location,
	startUtcMs,
	title,
}) satisfies z.ZodType<EventUserValues>;
