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

type IsGuildMember = {
	guild: Guild;
	memberId: string;
};

export const isGuildMember = async ({
	guild,
	memberId,
}: IsGuildMember): Promise<boolean> => {
	try {
		// Throws on invalid input
		await guild.members.fetch(memberId);

		return true;
	} catch (_) {
		return false;
	}
};
