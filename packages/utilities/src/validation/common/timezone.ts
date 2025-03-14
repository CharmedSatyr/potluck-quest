import { z } from "zod";
import type { SupportedTimezones } from "~/@types/timezone.js";
import { SUPPORTED_TIMEZONES } from "~/constants/index.js";

export const timezone: z.ZodEnum<SupportedTimezones> =
	z.enum(SUPPORTED_TIMEZONES);
