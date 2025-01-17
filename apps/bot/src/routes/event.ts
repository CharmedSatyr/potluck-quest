import { Router, Request, Response } from "express";
import {
	getEventMetadataSchema,
	postEventSchema,
} from "~/routes/event.schema.js";
import {
	createDiscordEvent,
	getGuild,
	isGuildMember,
} from "~/services/discord";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
	const { body } = req;

	const parsed = postEventSchema.safeParse(body);

	if (!parsed.success) {
		res.status(400).send();
		return;
	}

	const event = await createDiscordEvent(parsed.data);

	if (event) {
		res.status(200).send();
		return;
	}

	res.status(500).send();
});

router.get("/metadata", async (req: Request, res: Response): Promise<void> => {
	const { query } = req;

	const parsed = getEventMetadataSchema.safeParse(query);

	if (!parsed.success) {
		res.status(400).send();
		return;
	}

	const guild = await getGuild({ guildId: parsed.data.discordGuildId });

	if (!guild) {
		res.status(400).send();
		return;
	}

	const isMember = await isGuildMember({
		guild,
		memberId: parsed.data.discordUserId,
	});

	res.json({
		isMember,
		name: guild.name,
		iconUrl: guild.iconURL(),
	});
});

export default router;
