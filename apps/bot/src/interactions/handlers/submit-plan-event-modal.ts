import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	MessageFlags,
	ModalSubmitInteraction,
} from "discord.js";
import api from "~/api";
import config from "~/config";
import { CustomId } from "~/constants";
import { createEvent as createDiscordEvent } from "~/services/discord";
import {
	createEvent as createPotluckQuestEvent,
	getUserTimezone,
} from "~/services/potluck-quest";
import { parseDateTimeInputForServices } from "~/utilities/date-time";
import buildDescriptionBlurb from "~/utilities/description-blurb";

export const data = { customId: CustomId.PLAN_EVENT_MODAL };

export const execute = async (interaction: ModalSubmitInteraction) => {
	if (!interaction.guild?.id) {
		await interaction.reply({
			content: `<@${interaction.user.id}> Please ensure you're creating the event on a server with **Potluck Quest Bot** installed and try again.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const title = interaction.fields.getTextInputValue(CustomId.PLAN_EVENT_TITLE);
	const dateTime = interaction.fields.getTextInputValue(
		CustomId.PLAN_EVENT_DATETIME
	);
	const location = interaction.fields.getTextInputValue(
		CustomId.PLAN_EVENT_LOCATION
	);
	const description = interaction.fields.getTextInputValue(
		CustomId.PLAN_EVENT_DESCRIPTION
	);

	const timezone = await getUserTimezone(interaction.user.id);
	const parsedDateTime = parseDateTimeInputForServices(dateTime, timezone);

	if (!parsedDateTime) {
		await interaction.reply({
			content: `<@${interaction.user.id}> We failed to create **${title}**. Please format the date and time clearly and try again.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const { startDate, startTime, startUtcMs, endUtcMs } = parsedDateTime;

	const code = await createPotluckQuestEvent({
		description,
		discordUserId: interaction.user.id,
		endUtcMs,
		location,
		startUtcMs,
		title,
	});

	if (!code) {
		await interaction.reply({
			content: `<@${interaction.user.id}> We failed to create event **${title}**. Make sure you have an account on [Potluck Quest](${config.POTLUCK_QUEST_BASE_URL}) and try again.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const augmentedDescription = description.concat(
		"\n",
		buildDescriptionBlurb(code)
	);

	const discordEvent = await createDiscordEvent({
		guildId: interaction.guild?.id,
		title,
		description: augmentedDescription,
		location,
		startUtcMs,
		endUtcMs,
	});

	if (!discordEvent) {
		await interaction.reply({
			content: `<@${interaction.user.id}> We failed to create **${title}**. Please try again.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const link = `[**${title}**](${config.POTLUCK_QUEST_BASE_URL}/event/${code})`;

	// Prevent errors with both DEV and PROD servers running.
	if (!interaction.replied) {
		await interaction.reply({
			content: `<@${interaction.user.id}> is planning a new event, ${link}. Type \`/slots ${code}\` and sign up to bring something!`,
		});
	}

	const params = new URLSearchParams();
	params.append("description", description);
	params.append("location", location);
	params.append("startDate", startDate);
	params.append("startTime", startTime);
	params.append("title", title);
	params.append("code", code);
	params.append("source", "discord");

	const button = new ButtonBuilder()
		.setLabel("Add Signup Slots")
		.setStyle(ButtonStyle.Link)
		.setURL(api.AUTH_PLAN_FOOD.concat("?").concat(params.toString()));

	const createSlotsPrompt = new ActionRowBuilder<ButtonBuilder>().addComponents(
		button
	);

	await interaction.followUp({
		content: `<@${interaction.user.id}> Make sure to add signup slots so others know what to bring.`,
		components: [createSlotsPrompt],
		flags: MessageFlags.Ephemeral,
	});
};
