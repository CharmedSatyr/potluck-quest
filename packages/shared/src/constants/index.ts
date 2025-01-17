import { SupportedTimezone, SupportedTimezones } from "~/types/timezone.js";

export const DESCRIPTION_LENGTH = 500;
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
