import { z } from "@potluck/utilities/validation";
import {
	Guild,
	GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel,
} from "discord.js";
import client from "~/client.js";
import {
	cancelDiscordEventSchema,
	createDiscordEventSchema,
	getGuildSchema,
} from "~/services/discord.schema.js";

export const createDiscordEvent = async (
	data: z.infer<typeof createDiscordEventSchema>
) => {
	try {
		createDiscordEventSchema.parse(data);

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

export const getGuild = async (
	data: z.infer<typeof getGuildSchema>
): Promise<Guild | null> => {
	try {
		getGuildSchema.parse(data);

		return await client.guilds.fetch(data.guildId);
	} catch (error) {
		console.error(
			"Error getting Discord guild:",
			JSON.stringify(error, null, 2)
		);

		return null;
	}
};

export const isGuildMember = async ({
	guild,
	memberId,
}: {
	guild: Guild;
	memberId: string;
}): Promise<boolean> => {
	try {
		const member = await guild.members.fetch(memberId).catch(() => null);

		return Boolean(member);
	} catch (error) {
		console.info("Error looking up guild member:", error);

		return false;
	}
};

export const cancelDiscordEvent = async (
	data: z.infer<typeof cancelDiscordEventSchema>
): Promise<boolean> => {
	try {
		cancelDiscordEventSchema.parse(data);

		const guild = await client.guilds.fetch(data.guildId);

		await guild.scheduledEvents.delete(data.eventId);

		return true;
	} catch (error) {
		console.error({
			message: "Error canceling Discord event",
			error,
			guildId: data?.guildId,
			eventId: data?.eventId,
		});

		return false;
	}
};
