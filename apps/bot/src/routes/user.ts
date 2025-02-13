import { botApi, z } from "@potluck/utilities/validation";
import { Router, Response } from "express";
import client from "~/client.js";
import validateRequest from "~/middleware/validate-request.js";
import { hasDiscordCreateEventsPermissions } from "~/services/discord.js";

const router = Router();

router.get(
	"/guilds",
	validateRequest(botApi.user.getGuildsSchema),
	async (
		req: ValidRequest<unknown, z.infer<typeof botApi.user.getGuildsSchema>>,
		res: Response
	): Promise<void> => {
		const { discordUserId } = req.query;

		const botGuilds = client.guilds.cache;
		const guildsWithPermissions = [];

		for (const [guildId, guild] of botGuilds) {
			const member = await guild.members.fetch(discordUserId).catch(() => null);

			if (hasDiscordCreateEventsPermissions(member)) {
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
