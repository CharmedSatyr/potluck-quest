import {
	Guild,
	GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel,
} from "discord.js";
import client from "~/client";

// TODO: zod
type DiscordEventData = {
	description: string;
	endUtcMs: number;
	guildId: string;
	location: string;
	startUtcMs: number;
	title: string;
};

export const createEvent = async (data: DiscordEventData) => {
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
		console.error(
			"Error creating Discord event:",
			JSON.stringify(error, null, 2)
		);

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

type IsGuildMemberData = {
	guildId: string;
	userId: string;
};

export const isGuildMember = async ({
	guildId,
	userId,
}: IsGuildMemberData): Promise<boolean> => {
	try {
		const guild = await getGuild(guildId);

		if (!guild) {
			return false;
		}

		const member = await guild.members.fetch(userId);

		if (member) {
			return true;
		}

		return false;
	} catch (error) {
		console.error(
			"Error getting user is Discord guild member:",
			JSON.stringify(error, null, 2)
		);

		return false;
	}
};
