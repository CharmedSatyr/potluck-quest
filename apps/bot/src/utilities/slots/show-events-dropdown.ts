import { formatTimestampForView } from "../date-time.js";
import {
	ActionRowBuilder,
	ChatInputCommandInteraction,
	MessageFlags,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { CustomId } from "~/constants/custom-id.js";
import config from "~/constants/env-config.js";
import {
	getPotluckCodesByDiscordIds,
	getUserTimezone,
} from "~/services/web.js";

export const showEventsDropdown = async (
	interaction: ChatInputCommandInteraction
): Promise<void> => {
	const events = await interaction.guild?.scheduledEvents.fetch();
	const pqEvents = events?.filter(
		(event) =>
			(event.creatorId === config.CLIENT_ID && event.isScheduled()) ||
			event.isActive()
	);

	if (!pqEvents || pqEvents.size === 0 || !interaction.guild) {
		await interaction.reply({
			content: `No [Potluck Quest](${config.PQ_WEB_BASE_URL}) events found. Type \`/plan\` to get started!`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const codesByIds = await getPotluckCodesByDiscordIds({
		discordEventIds: pqEvents.map((event) => event.id) as [string, ...string[]],
	});

	const timezone = await getUserTimezone({
		discordUserId: interaction.user.id,
	});

	const options = pqEvents.map((event) => {
		const code = codesByIds[event.id];

		return new StringSelectMenuOptionBuilder()
			.setLabel(`${event.name} | ${code}`)
			.setDescription(
				formatTimestampForView(event.scheduledStartTimestamp, timezone)
			)
			.setValue(code);
	});

	const select = new StringSelectMenuBuilder()
		.setCustomId(CustomId.SLOTS_SELECT_EVENT)
		.setPlaceholder("Choose your event")
		.addOptions(...options);

	const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
		select
	);

	await interaction.reply({
		content: "Choose your event",
		components: [row],
		flags: MessageFlags.Ephemeral,
	});
};
