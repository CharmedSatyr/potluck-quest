import { SUPPORTED_TIMEZONES } from "@potluck/constants";
import { SupportedTimezones } from "@potluck/types";
import { z } from "zod";

export const timezone: z.ZodEnum<SupportedTimezones> =
	z.enum(SUPPORTED_TIMEZONES);
