/**
 * IANA format used by Luxon
 * See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
type SupportedTimezone =
	| "Pacific/Honolulu"
	| "America/Anchorage"
	| "America/Los_Angeles"
	| "America/Denver"
	| "America/Chicago"
	| "America/New_York";

type SupportedTimezones = [SupportedTimezone, ...SupportedTimezone[]];
