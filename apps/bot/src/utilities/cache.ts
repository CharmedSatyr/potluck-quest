import NodeCache from "node-cache";

export const slotsCache = new NodeCache({
	stdTTL: 3600, // Keep slots cache for an hour
	checkperiod: 1200, // Clear it every 20 minutes
});

export const accountExistsCache = new NodeCache({
	stdTTL: 60 * 24 * 7, // Keep account exists data for a week
	checkperiod: 60 * 24, // Clear it out every day
});
