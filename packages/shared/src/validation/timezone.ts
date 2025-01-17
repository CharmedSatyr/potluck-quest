import { z } from "zod";
import { SUPPORTED_TIMEZONES } from "~/constants/index.js";
import { SupportedTimezones } from "~/types/timezone.js";

export const timezone: z.ZodEnum<SupportedTimezones> =
	z.enum(SUPPORTED_TIMEZONES);
