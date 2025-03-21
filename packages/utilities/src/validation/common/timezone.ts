import { z } from "zod";
import { SUPPORTED_TIMEZONES } from "~/constants/index.js";

export const timezone = z.enum(SUPPORTED_TIMEZONES);
