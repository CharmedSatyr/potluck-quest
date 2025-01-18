import { z } from "@potluck/utilities/validation";
import { Router, Response } from "express";
import client from "~/client.js";
import validateRequest from "~/middleware/validate-request.js";
import { getUserGuildsSchema } from "~/routes/user.schema.js";

const router = Router();

router.get(
	"/guilds",
	validateRequest(getUserGuildsSchema),
	async (
		req: ValidRequest<unknown, z.infer<typeof getUserGuildsSchema>>,
		res: Response
	): Promise<void> => {
		const { discordUserId } = req.query;

		const botGuilds = client.guilds.cache;
		const guildsWithPermissions = [];

		for (const [guildId, guild] of botGuilds) {
			const member = await guild.members.fetch(discordUserId).catch(() => null);

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
	}
);

export default router;
