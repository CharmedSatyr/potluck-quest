import { botApi, z } from "@potluck/utilities/validation";
import { Router, Response } from "express";
import validateRequest from "~/middleware/validate-request.js";
import {
	cancelDiscordEvent,
	createDiscordEvent,
	getGuild,
	isGuildMember,
	updateDiscordEvent,
} from "~/services/discord.js";

const router = Router();

router.post(
	"/",
	validateRequest(botApi.event.postSchema),
	async (
		req: ValidRequest<z.infer<typeof botApi.event.postSchema>>,
		res: Response
	): Promise<void> => {
		const { body } = req;

		const event = await createDiscordEvent(body);

		if (event) {
			res.status(200).send();
			return;
		}

		res.status(500).send();
	}
);

router.put(
	"/",
	validateRequest(botApi.event.putSchema),
	async (
		req: ValidRequest<z.infer<typeof botApi.event.putSchema>>,
		res: Response
	) => {
		const { body } = req;

		const result = await updateDiscordEvent(body);

		if (result) {
			res.status(200).send();
			return;
		}

		res.status(500).send();
	}
);

router.delete(
	"/",
	validateRequest(botApi.event.deleteSchema),
	async (
		req: ValidRequest<{}, z.infer<typeof botApi.event.deleteSchema>>,
		res: Response
	): Promise<void> => {
		const { query } = req;

		const result = await cancelDiscordEvent(query);

		if (result) {
			res.status(200).send();
			return;
		}

		res.status(500).send();
	}
);

router.get(
	"/metadata",
	validateRequest(botApi.event.getMetadataSchema),
	async (
		req: ValidRequest<unknown, z.infer<typeof botApi.event.getMetadataSchema>>,
		res: Response
	): Promise<void> => {
		const { discordGuildId, discordUserId } = req.query;

		const guild = await getGuild({ guildId: discordGuildId });

		if (!guild) {
			res.status(400).send();
			return;
		}

		const isMember = await isGuildMember({
			guild,
			memberId: discordUserId,
		});

		res.json({
			isMember,
			name: guild.name,
			iconUrl: guild.iconURL(),
		});

		res.status(400).send();
	}
);

export default router;
