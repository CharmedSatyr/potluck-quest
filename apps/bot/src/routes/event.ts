import { Router, Request, Response } from "express";
import { getGuild, isGuildMember } from "~/services/discord";

const router = Router();

router.get("/metadata", async (req: Request, res: Response): Promise<void> => {
	const { query } = req;
	const { discordGuildId, memberId } = query;

	// TODO: zod
	if (typeof discordGuildId !== "string" || typeof memberId !== "string") {
		res.status(400);
		return;
	}

	const guild = await getGuild(discordGuildId);

	if (!guild) {
		res.status(400);
		return;
	}

	const isMember = await isGuildMember({
		guild,
		memberId,
	});

	res.json({
		isMember,
		name: guild.name,
		iconURL: guild.iconURL(),
	});
});

export default router;
