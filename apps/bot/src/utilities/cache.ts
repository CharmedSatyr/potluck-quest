import NodeCache from "node-cache";

export const slotsCache = new NodeCache({
	stdTTL: 3600, // Keep slots cache for an hour
	checkperiod: 1200, // Clear it every 20 minutes
});

export const accountExistsCache = new NodeCache(); // Retain account exists data indefinitely

/** Stores <DiscordUserId, SupportedTimezone> */
export const timezoneCache = new NodeCache({
	stdTTL: 60 * 60 * 24, // Keep timezone data for a day
	checkperiod: 60 * 60, // Clear it out every hour
});
