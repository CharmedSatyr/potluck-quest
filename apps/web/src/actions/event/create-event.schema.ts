import { description } from "@potluck/shared/validation";
import { userId } from "@potluck/shared/validation";
import { location } from "@potluck/shared/validation";
import { title } from "@potluck/shared/validation";
import { startUtcMs } from "@potluck/shared/validation";
import { endUtcMs } from "@potluck/shared/validation";
import { hosts } from "@potluck/shared/validation";
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
