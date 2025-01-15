import envConfig from "~/constants/env-config";

const webApi = {
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
	Object.entries(webApi).map(([key, path]) => [
		key,
		envConfig.PQ_WEB_BASE_URL.concat(path),
	])
);
