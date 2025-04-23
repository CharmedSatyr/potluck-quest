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
			res.sendStatus(500);
			return;
		}

		await mapDiscordToPotluckEvent({
			discordGuildId: discordEvent.guildId,
			discordEventId: discordEvent.id,
			potluckEventCode: code,
		});

		res.sendStatus(200);
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
			res.sendStatus(200);
			return;
		}

		res.sendStatus(500);
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
			res.sendStatus(200);
			return;
		}

		res.sendStatus(500);
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
			res.sendStatus(400);
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
