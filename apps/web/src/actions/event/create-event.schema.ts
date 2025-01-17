import { description } from "@potluck/validation";
import { userId } from "@potluck/validation";
import { location } from "@potluck/validation";
import { title } from "@potluck/validation";
import { startUtcMs } from "@potluck/validation";
import { endUtcMs } from "@potluck/validation";
import { hosts } from "@potluck/validation";
import { z } from "zod";

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
