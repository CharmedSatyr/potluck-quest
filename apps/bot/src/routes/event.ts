import { z } from "@potluck/shared/validation";
import { Router, Response } from "express";
import validateRequest from "~/middleware/validate-request.js";
import {
	getEventMetadataSchema,
	postEventSchema,
} from "~/routes/event.schema.js";
import {
	createDiscordEvent,
	getGuild,
	isGuildMember,
} from "~/services/discord.js";

const router = Router();

router.post(
	"/",
	validateRequest(postEventSchema),
	async (
		req: ValidRequest<z.infer<typeof postEventSchema>>,
		res: Response
	): Promise<void> => {
		const body = req.body;

		const event = await createDiscordEvent(body);

		if (event) {
			res.status(200).send();
			return;
		}

		res.status(500).send();
	}
);

router.get(
	"/metadata",
	validateRequest(getEventMetadataSchema),
	async (
		req: ValidRequest<unknown, z.infer<typeof getEventMetadataSchema>>,
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
	}
);

export default router;
