import { MessageFlags, ModalSubmitInteraction } from "discord.js";
import { CustomId } from "~/constants/custom-id.js";
import config from "~/constants/env-config.js";
import api from "~/constants/web-api.js";
import { createDiscordEvent } from "~/services/discord.js";
import {
	createPotluckEvent as createPotluckQuestEvent,
	getUserTimezone,
	mapDiscordToPotluckEvent,
} from "~/services/web.js";
import { parseDateTimeInputForServices } from "~/utilities/date-time.js";
import { addDescriptionBlurb } from "~/utilities/description-blurb.js";

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

	const timezone = await getUserTimezone({
		discordUserId: interaction.user.id,
	});
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
			content: `<@${interaction.user.id}> We failed to create event **${title}**. Make sure you have an account on [Potluck Quest](${config.PQ_WEB_BASE_URL}) and try again.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const augmentedDescription = addDescriptionBlurb(description, code);

	const discordEvent = await createDiscordEvent({
		guildId: interaction.guild.id,
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

	const mapped = await mapDiscordToPotluckEvent({
		discordGuildId: discordEvent.guildId,
		discordEventId: discordEvent.id,
		potluckEventCode: code,
	});

	if (!mapped) {
		throw new Error(
			`Failed to map Discord event ${discordEvent.id} to Potluck Quest event ${code}`
		);
	}

	const url = config.PQ_WEB_BASE_URL.concat("/event/").concat(code);

	// The space after the URL is required for preview links to display properly.
	await interaction.reply({
		content: `<@${interaction.user.id}> is planning a new event, [**${title}**](${url} ). Type \`/slots ${code}\` and sign up to bring something!`,
	});

	const params = new URLSearchParams();
	params.append("description", description);
	params.append("location", location);
	params.append("startDate", startDate);
	params.append("startTime", startTime);
	params.append("title", title);
	params.append("code", code);
	params.append("source", "discord");

	const slotsLink = api.AUTH_PLAN_FOOD.concat("?").concat(params.toString());

	await interaction.followUp({
		content: `<@${interaction.user.id}> Make sure to [add signup slots](${slotsLink}) so others know what to bring.`,
		flags: MessageFlags.Ephemeral,
	});
};
