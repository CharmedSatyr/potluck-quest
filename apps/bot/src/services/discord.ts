import {
	Guild,
	GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel,
} from "discord.js";
import { z } from "zod";
import client from "~/client";
import { createEventSchema } from "~/services/discord.schema";

export const createEvent = async (data: z.infer<typeof createEventSchema>) => {
	try {
		const guild = await client.guilds.fetch(data.guildId);

		const event = await guild.scheduledEvents.create({
			description: data.description,
			entityMetadata: {
				location: data.location,
			},
			entityType: GuildScheduledEventEntityType.External,
			image: undefined, // TODO
			name: data.title,
			privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
			scheduledEndTime: data.endUtcMs,
			scheduledStartTime: data.startUtcMs,
		});

		return event;
	} catch (error) {
		console.error("Error creating Discord event:", error);

		return null;
	}
};

export const getGuild = async (guildId: string): Promise<Guild | null> => {
	try {
		return await client.guilds.fetch(guildId);
	} catch (error) {
		console.error(
			"Error getting Discord guild:",
			JSON.stringify(error, null, 2)
		);

		return null;
	}
};

type IsGuildMember = {
	guild: Guild;
	memberId: string;
};

export const isGuildMember = async ({
	guild,
	memberId,
}: IsGuildMember): Promise<boolean> => {
	try {
		const member = await guild.members.fetch(memberId).catch(() => null);

		return Boolean(member);
	} catch (error) {
		console.info("Error looking up guild member:", error);

		return false;
	}
};
