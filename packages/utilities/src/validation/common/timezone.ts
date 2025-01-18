import { z } from "zod";
import { SUPPORTED_TIMEZONES } from "~/constants/index.js";
import type { SupportedTimezones } from "~/types/timezone.d.ts";

export const timezone: z.ZodEnum<SupportedTimezones> =
	z.enum(SUPPORTED_TIMEZONES);
