import { Router, Request, Response } from "express";
import { getGuild } from "~/services/discord";

const router = Router();

router.get("/metadata", async (req: Request, res: Response): Promise<void> => {
	const { query } = req;

	if (typeof query.discordGuildId !== "string") {
		res.status(400);
		return;
	}

	const guild = await getGuild(query.discordGuildId);

	if (!guild) {
		res.status(400);
		return;
	}

	res.json({
		name: guild.name,
		iconURL: guild.iconURL(),
	});
});

export default router;
