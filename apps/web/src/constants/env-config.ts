import "dotenv/config";

const getEnvVar = (key: string): string => {
	const value = process.env[key];

	if (!value) {
		console.warn(`Environment variable ${key} is not defined.`);
	}

	return value!;
};

export default {
	// Auth
	AUTH_SECRET: getEnvVar("AUTH_SECRET"),
	AUTH_DISCORD_ID: getEnvVar("AUTH_DISCORD_ID"),
	AUTH_DISCORD_SECRET: getEnvVar("AUTH_DISCORD_SECRET"),
	AUTH_DRIZZLE_URL: getEnvVar("AUTH_DRIZZLE_URL"),
	NEXTAUTH_SECRET: getEnvVar("NEXTAUTH_SECRET"),

	// Neon
	DATABASE_URL: getEnvVar("DATABASE_URL"),
	DATABASE_USER: getEnvVar("DATABASE_USER"),
	DATABASE_PASSWORD: getEnvVar("DATABASE_PASSWORD"),
	DATABASE_HOST: getEnvVar("DATABASE_HOST"),
	DATABASE_NAME: getEnvVar("DATABASE_NAME"),

	// OpenAI
	OPENAI_API_KEY: getEnvVar("OPENAI_API_KEY"),

	// Discord
	DISCORD_APP_ID: getEnvVar("DISCORD_APP_ID"),
	DISCORD_TOKEN: getEnvVar("DISCORD_TOKEN"),
	DISCORD_PUBLIC_KEY: getEnvVar("DISCORD_PUBLIC_KEY"),

	// Potluck
	PQ_BOT_BASE_URL: getEnvVar("PQ_BOT_BASE_URL"),
	PQ_BOT_TO_WEB_API_KEY: getEnvVar("PQ_BOT_TO_WEB_API_KEY"),
	PQ_WEB_TO_BOT_API_KEY: getEnvVar("PQ_WEB_TO_BOT_API_KEY"),
};
