import type {
	SupportedTimezone,
	SupportedTimezones,
} from "~/types/timezone.d.ts";

export const COMMITMENT_DESCRIPTION_LENGTH = 100;
export const DESCRIPTION_LENGTH = 1000;
export const EVENT_CODE_LENGTH = 5;
export const HOSTS_LENGTH = 100;
export const DEFAULT_TIMEZONE: SupportedTimezone = "America/Los_Angeles";

export const SUPPORTED_TIMEZONES: SupportedTimezones = [
	"Pacific/Honolulu",
	"America/Anchorage",
	"America/Los_Angeles",
	"America/Denver",
	"America/Chicago",
	"America/New_York",
] as const;
