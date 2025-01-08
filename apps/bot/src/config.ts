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
	POTLUCK_QUEST_BASE_URL: getEnvVar("POTLUCK_QUEST_BASE_URL"),
};
