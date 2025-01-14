import config from "./constants/env-config";
import { getGuild } from "./services/discord";
import express from "express";
import "~/client";

const app = express();

app.get("/api/discord/metadata", async (req, res): Promise<void> => {
	if (req.headers["x-api-key"] !== config.PQ_WEB_TO_BOT_API_KEY) {
		res.status(401);
		return;
	}

	const query = req.query;

	const guild = await getGuild(query.discordGuildId as string);

	if (!guild) {
		res.status(400);
		return;
	}

	res.json({
		message: "Hi!",
		name: guild.name,
		iconURL: guild.iconURL(),
	});
});

export default app;
