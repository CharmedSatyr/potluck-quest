import config from "~/config";

const pqApi = {
	AUTH_CHECK_ACCOUNT_EXISTS: "/api/bot/auth/check-account-exists",
	AUTH_PLAN_FOOD: "/api/auth/plan-food",
	AUTH_SETUP: "/api/auth/setup",
	COMMITMENT: "/api/bot/commitment",
	EVENT: "/api/bot/event",
	RSVP: "/api/bot/rsvp",
	SLOTS: "/api/bot/slots",
	TIMEZONE: "/api/bot/timezone",
};

export default Object.fromEntries(
	Object.entries(pqApi).map(([key, path]) => [
		key,
		config.PQ_BASE_URL.concat(path),
	])
);
