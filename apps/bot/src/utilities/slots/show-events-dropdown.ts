import {
	ActionRowBuilder,
	ChatInputCommandInteraction,
	MessageComponentInteraction,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { CustomId } from "~/constants/custom-id.js";
import config from "~/constants/env-config.js";
import {
	getPotluckCodesByDiscordIds,
	getUserTimezone,
} from "~/services/web.js";
import { formatTimestampForView } from "~/utilities/date-time.js";

export const showEventsDropdown = async (
	interaction: ChatInputCommandInteraction
): Promise<void> => {
	if (!interaction.deferred) {
		throw new Error(
			"Expected interaction to be deferred in showEventsDropdown"
		);
	}

	const events = await interaction.guild?.scheduledEvents.fetch();
	const pqEvents = events?.filter(
		(event) =>
			(event.creatorId === config.CLIENT_ID && event.isScheduled()) ||
			event.isActive()
	);

	if (!pqEvents || pqEvents.size === 0 || !interaction.guild) {
		await interaction.editReply({
			content: `No [Potluck Quest](${config.PQ_WEB_BASE_URL}) events found. Type \`/plan\` to get started!`,
		});
		return;
	}

	if (pqEvents.size >= 25) {
		await interaction.editReply({
			content: `Goodness, there are too many events to list! Include your event's [Potluck Quest code](${config.PQ_WEB_BASE_URL}/guide#event-codes) when typing the \`/slots\` command.`,
		});
		return;
	}

	const codesByIds = await getPotluckCodesByDiscordIds({
		discordEventIds: pqEvents.map((event) => event.id) as [string, ...string[]],
	});

	const timezone = await getUserTimezone({
		discordUserId: interaction.user.id,
	});

	const options = pqEvents
		// Skip events without code, which can happen if a mapping is missing or an event was deleted on web but not Discord.
		.filter((event) => codesByIds[event.id])
		.map((event) => {
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

	const prompt = await interaction.editReply({
		content: "Which event would you like to bring something to?",
		components: [row],
	});

	// Remove the dropdown on click or timeout so it can't be reused.
	const collectorFilter = (i: MessageComponentInteraction): boolean =>
		i.isStringSelectMenu() && i.customId === CustomId.SLOTS_SELECT_EVENT;

	try {
		const selection = await prompt.awaitMessageComponent({
			filter: collectorFilter,
			time: 60_000,
		});

		const label = options.find(
			(option) =>
				selection.isStringSelectMenu() &&
				option.data.value === selection.values[0]
		)?.data?.label;

		const selectedCode = label ? `\n\`${label}\`` : "";

		await interaction.editReply({
			content: "Which event would you like to bring something to?".concat(
				selectedCode
			),
			components: [],
		});
	} catch (err) {
		await interaction.editReply({
			content: "Confirmation not received within 1 minute. Please try again.",
			components: [],
		});
	}
};
