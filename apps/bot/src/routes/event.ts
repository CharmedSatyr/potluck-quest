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
import { mapDiscordToPotluckEvent } from "~/services/web.js";
import { addDescriptionBlurb } from "~/utilities/description-blurb.js";

const router = Router();

router.post(
	"/",
	validateRequest(botApi.event.postSchema),
	async (
		req: ValidRequest<z.infer<typeof botApi.event.postSchema>>,
		res: Response
	): Promise<void> => {
		const { body } = req;
		const { code, ...rest } = body;

		rest.description = addDescriptionBlurb(rest.description, code);

		const discordEvent = await createDiscordEvent(rest);

		if (!discordEvent) {
			res.status(500).send();
			return;
		}

		await mapDiscordToPotluckEvent({
			discordGuildId: discordEvent.guildId,
			discordEventId: discordEvent.id,
			potluckEventCode: code,
		});

		res.status(200).send();
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
		const { code, ...rest } = body;

		if (rest.description) {
			rest.description = addDescriptionBlurb(rest.description, code);
		}

		const result = await updateDiscordEvent(rest);

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
		req: ValidRequest<null, z.infer<typeof botApi.event.deleteSchema>>,
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
	}
);

export default router;
