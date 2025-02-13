import envConfig from "~/constants/env-config";

const {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_URL,
	DATABASE_USER,
} = envConfig;

export const config = {
	connectionString: DATABASE_URL,
	database: DATABASE_NAME,
	host: DATABASE_HOST,
	password: DATABASE_PASSWORD,
	ssl: true,
	user: DATABASE_USER,
};
