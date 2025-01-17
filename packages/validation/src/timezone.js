import { z } from "zod";
import { SUPPORTED_TIMEZONES } from "~/constants/timezone";

export const timezone = z.enum(SUPPORTED_TIMEZONES);
