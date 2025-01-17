import { Router, Request, Response } from "express";
import client from "~/client";

const router = Router();

router.get("/guilds", async (req: Request, res: Response): Promise<void> => {
	const { query } = req;
	const { userId } = query;

	// TODO: zod
	if (typeof userId !== "string") {
		res.status(400);
		return;
	}

	const botGuilds = client.guilds.cache;
	const guildsWithPermissions = [];

	for (const [guildId, guild] of botGuilds) {
		const member = await guild.members.fetch(userId).catch(() => null);

		if (!member) {
			continue;
		}

		if (member.permissions.has("ManageEvents")) {
			guildsWithPermissions.push({
				name: guild.name,
				guildId,
				iconUrl: guild.iconURL(),
			});
		}
	}

	res.json({
		guilds: guildsWithPermissions,
	});
});

export default router;
