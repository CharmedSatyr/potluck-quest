import { imageUrl as imageUrlSchema } from "@potluck/utilities/validation";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	MessageFlags,
	ModalSubmitInteraction,
} from "discord.js";
import { CustomId } from "~/constants/custom-id.js";
import config from "~/constants/env-config.js";
import api from "~/constants/web-api.js";
import { createDiscordEvent } from "~/services/discord.js";
import {
	createPotluckQuestEvent,
	getUserTimezone,
	mapDiscordToPotluckEvent,
} from "~/services/web.js";
import {
	formatTimestampForPlan,
	parseDateTimeInputForServices,
} from "~/utilities/date-time.js";
import { addDescriptionBlurb } from "~/utilities/description-blurb.js";

export const data = { customId: CustomId.PLAN_EVENT_MODAL };

export const execute = async (interaction: ModalSubmitInteraction) => {
	if (!interaction.guild?.id) {
		console.error("Missing guild ID in submit commitment details modal");

		throw new Error();
	}

	const title = interaction.fields.getTextInputValue(CustomId.PLAN_EVENT_TITLE);
	const dateTime = interaction.fields.getTextInputValue(
		CustomId.PLAN_EVENT_DATETIME
	);
	const location = interaction.fields.getTextInputValue(
		CustomId.PLAN_EVENT_LOCATION
	);
	const imageUrl =
		interaction.fields.getTextInputValue(CustomId.PLAN_EVENT_IMAGE_URL) ||
		undefined;
	const description = interaction.fields.getTextInputValue(
		CustomId.PLAN_EVENT_DESCRIPTION
	);

	if (!imageUrlSchema.safeParse(imageUrl).success) {
		throw new Error(
			`<@${interaction.user.id}> There was a problem creating **${title}**. Please make sure your image URL is valid, and try again.`
		);
	}

	const timezone = await getUserTimezone({
		discordUserId: interaction.user.id,
	});
	const parsedDateTime = parseDateTimeInputForServices(dateTime, timezone);

	if (!parsedDateTime) {
		throw new Error(
			`<@${interaction.user.id}> There was a problem creating **${title}**. Please format the date and time clearly and try again.`
		);
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
		throw new Error();
	}

	const augmentedDescription = addDescriptionBlurb(description, code);

	const discordEvent = await createDiscordEvent({
		guildId: interaction.guild.id,
		title,
		description: augmentedDescription,
		imageUrl,
		location,
		startUtcMs,
		endUtcMs,
	});

	if (!discordEvent) {
		throw new Error();
	}

	const mapped = await mapDiscordToPotluckEvent({
		discordGuildId: discordEvent.guildId,
		discordEventId: discordEvent.id,
		potluckEventCode: code,
	});

	if (!mapped) {
		console.error({
			message: "Failed to map Discord event to PQ event",
			code,
			discordEventId: discordEvent.id,
		});

		throw new Error();
	}

	const url = config.PQ_WEB_BASE_URL.concat("/event/").concat(code);

	const { date, time } = formatTimestampForPlan(startUtcMs, timezone);

	const eventEmbed = new EmbedBuilder()
		.setColor("#FF8A50") // PQ Primary orange
		.setTitle(title.concat(" | ").concat(code))
		.setURL(url)
		.setImage(imageUrl ?? null)
		.setDescription(description || null)
		.addFields(
			{ name: "Date", value: date, inline: true },
			{ name: "Time", value: time, inline: true },
			{ name: "Location", value: location, inline: false }
		)
		.setAuthor({
			name: interaction.user.globalName ?? interaction.user.username,
			iconURL: interaction.user.avatarURL() ?? undefined,
		})
		.setFooter({
			text: `${interaction.guild.name} members are invited`,
			iconURL: interaction.guild.iconURL() ?? undefined,
		})
		.setTimestamp();

	const interestedButton = new ButtonBuilder()
		.setLabel("✅ Sign me up!")
		.setURL(discordEvent.url)
		.setStyle(ButtonStyle.Link);

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
		interestedButton
	);

	await interaction.followUp({
		content: `<@${interaction.user.id}> is planning a new event with [Potluck Quest](${url}). Type \`/slots ${code}\` to bring something.`,
		embeds: [eventEmbed],
		components: [row],
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
