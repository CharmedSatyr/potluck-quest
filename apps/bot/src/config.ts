import "dotenv/config";

const getEnvVar = (key: string): string => {
	const value = process.env[key];

	if (!value) {
		throw new Error(`Environment variable ${key} is not defined.`);
	}

	return value;
};

// Resolve and export environment variables
export default {
	// Config
	BOT_TOKEN: getEnvVar("BOT_TOKEN"),
	CLIENT_ID: getEnvVar("CLIENT_ID"),
	PORT: getEnvVar("PORT"),
	PUBLIC_KEY: getEnvVar("PUBLIC_KEY"),
	// Routes
	POTLUCK_QUEST_BASE_URL: getEnvVar("POTLUCK_QUEST_BASE_URL"),
	POTLUCK_QUEST_AUTH_PLAN_FOOD_ROUTE: getEnvVar(
		"POTLUCK_QUEST_AUTH_PLAN_FOOD_ROUTE"
	),
	POTLUCK_QUEST_AUTH_SETUP_ROUTE: getEnvVar("POTLUCK_QUEST_AUTH_SETUP_ROUTE"),
	POTLUCK_COMMITMENT_API_URL: getEnvVar("POTLUCK_COMMITMENT_API_URL"),
	POTLUCK_EVENT_API_URL: getEnvVar("POTLUCK_EVENT_API_URL"),
	POTLUCK_CHECK_ACCOUNT_EXISTS_API_URL: getEnvVar(
		"POTLUCK_CHECK_ACCOUNT_EXISTS_API_URL"
	),
	POTLUCK_SLOTS_API_URL: getEnvVar("POTLUCK_SLOTS_API_URL"),
	POTLUCK_RSVP_API_URL: getEnvVar("POTLUCK_RSVP_API_URL"),
	POTLUCK_TIMEZONE_API_ROUTE: getEnvVar("POTLUCK_TIMEZONE_API_ROUTE"),
};
