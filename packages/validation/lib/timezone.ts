import { SUPPORTED_TIMEZONES } from "@potluck/constants";
import { z } from "zod";

// TODO: Move this
type SupportedTimezone =
	| "Pacific/Honolulu"
	| "America/Anchorage"
	| "America/Los_Angeles"
	| "America/Denver"
	| "America/Chicago"
	| "America/New_York";
type SupportedTimezones = [SupportedTimezone, ...SupportedTimezone[]];

export const timezone = z.enum(SUPPORTED_TIMEZONES as SupportedTimezones);
