import { getUserGuildsSchema } from "./user.schema";
import { Router, Request, Response } from "express";
import client from "~/client";

const router = Router();

router.get("/guilds", async (req: Request, res: Response): Promise<void> => {
	const { query } = req;

	const parsed = getUserGuildsSchema.safeParse(query);

	if (!parsed.success) {
		res.status(400).send();
		return;
	}

	const botGuilds = client.guilds.cache;
	const guildsWithPermissions = [];

	for (const [guildId, guild] of botGuilds) {
		const member = await guild.members
			.fetch(parsed.data.discordUserId)
			.catch(() => null);

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
