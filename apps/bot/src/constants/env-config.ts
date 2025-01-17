import "dotenv/config";

const getEnvVar = (key: string): string => {
	const value = process.env[key];

	if (!value) {
		throw new Error(`Environment variable ${key} is not defined.`);
	}

	return value;
};

export default {
	BOT_TOKEN: getEnvVar("BOT_TOKEN"),
	CLIENT_ID: getEnvVar("CLIENT_ID"),
	PORT: getEnvVar("PORT"),
	PUBLIC_KEY: getEnvVar("PUBLIC_KEY"),
	PQ_WEB_BASE_URL: getEnvVar("PQ_WEB_BASE_URL"),
	PQ_BOT_TO_WEB_API_KEY: getEnvVar("PQ_BOT_TO_WEB_API_KEY"),
	PQ_WEB_TO_BOT_API_KEY: getEnvVar("PQ_WEB_TO_BOT_API_KEY"),
};
