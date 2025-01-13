import config from "~/config";

const pqApi = {
	AUTH_PLAN_FOOD: "/api/bot/auth/plan-food",
	AUTH_SETUP: "/api/bot/auth/setup",
	COMMITMENT: "/api/bot/commitment",
	EVENT: "/api/bot/event",
	MAPPING: "/api/bot/mapping",
	RSVP: "/api/bot/rsvp",
	SLOTS: "/api/bot/slots",
	TIMEZONE: "/api/bot/timezone",
	USER: "/api/bot/user",
};

export default Object.fromEntries(
	Object.entries(pqApi).map(([key, path]) => [
		key,
		config.PQ_BASE_URL.concat(path),
	])
);
