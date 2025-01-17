import envConfig from "~/constants/env-config";

const botApi = {
	event: "/api/event",
	metadata: "/api/event/metadata",
	guilds: "/api/user/guilds",
};

export default Object.fromEntries(
	Object.entries(botApi).map(([key, path]) => [
		key,
		envConfig.PQ_BOT_BASE_URL.concat(path),
	])
);
