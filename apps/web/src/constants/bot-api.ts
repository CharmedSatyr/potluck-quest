import envConfig from "~/constants/env-config";

const botApi = {
	metadata: "/api/discord/metadata",
};

export default Object.fromEntries(
	Object.entries(botApi).map(([key, path]) => [
		key,
		envConfig.PQ_BOT_BASE_URL.concat(path),
	])
);
