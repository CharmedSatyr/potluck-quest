import { EVENT_DESCRIPTION_LENGTH } from "@potluck/utilities/constants";
import {
	ActionRowBuilder,
	ChatInputCommandInteraction,
	MessageFlags,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	SlashCommandBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import { CustomId } from "~/constants/custom-id.js";
import webApi from "~/constants/web-api.js";
import { hasDiscordCreateEventsPermissions } from "~/services/discord.js";
import { checkAccountExists, getUserTimezone } from "~/services/web.js";
import { getTimezoneOffsetName } from "~/utilities/date-time.js";
import getRandomPlaceholder from "~/utilities/get-random-placeholder.js";

// TODO: Add cooldowns https://discordjs.guide/additional-features/cooldowns.html#resulting-code
export const data = new SlashCommandBuilder()
	.setName("plan")
	.setDescription("Plan a new Potluck Quest event");

export const execute = async (interaction: ChatInputCommandInteraction) => {
	const timingStart = performance.now();

	if (!hasDiscordCreateEventsPermissions(interaction.member)) {
		await interaction.reply({
			content: `<@${interaction.user.id} You don't have permission to manage events on this server.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const [hasPotluckAccount, timezone] = await Promise.all([
		checkAccountExists({
			providerAccountId: interaction.user.id,
		}),
		getUserTimezone({ discordUserId: interaction.user.id }),
	]);

	if (!hasPotluckAccount) {
		await interaction.editReply({
			content: `<@${interaction.user.id}>, your journey awaits! [Sign in to Potluck Quest](${webApi.AUTH_SETUP} ) to continue.`,
		});
		return;
	}

	const { offsetNameShort } = getTimezoneOffsetName(timezone);

	const modal = new ModalBuilder()
		.setCustomId(CustomId.PLAN_EVENT_MODAL)
		.setTitle("Plan an Event");

	const titleInput = new TextInputBuilder()
		.setCustomId(CustomId.PLAN_EVENT_TITLE)
		.setLabel("Title")
		.setMinLength(1)
		.setMaxLength(100)
		.setPlaceholder("What's this adventure?")
		.setRequired(true)
		.setStyle(TextInputStyle.Short);

	const dateTimeInput = new TextInputBuilder()
		.setCustomId(CustomId.PLAN_EVENT_DATETIME)
		.setLabel(`Date and Time (${offsetNameShort})`)
		.setMinLength(1)
		.setMaxLength(100)
		.setPlaceholder("12/31 8pm - 10pm, Feb 5 at 9am (defaults to 1 hour)")
		.setRequired(true)
		.setStyle(TextInputStyle.Short);

	const placeholders = [
		"The field across from the pigpen, Caer Dallben",
		"Lyra’s Apothecary, 36 Azure Lane, Moonshade Village",
		"Captain Eldric’s boat, Celestine Port, Starfall Harbor",
		"The Blacksmith’s Forge, 5 Emberglade Grove",
		"Mira’s Bakery, 22 Frostpeak Summit, West Auroria",
		"Ealdor’s Manor, Shadowfang Pass, near Duskhaven",
		"Luthien’s Library, 12 Crystal Crescent, Dawnspire City",
		"The Siren’s Refuge, Sunken Bazaar, under Crescent Isle",
		"Aedric’s Stables, Crimson Spire, Emberlight District",
		"The Abyss",
	];

	const locationInput = new TextInputBuilder()
		.setCustomId(CustomId.PLAN_EVENT_LOCATION)
		.setLabel("Location")
		.setMinLength(1)
		.setMaxLength(100)
		.setPlaceholder(getRandomPlaceholder(placeholders))
		.setRequired(true)
		.setStyle(TextInputStyle.Short);

	const descriptionInput = new TextInputBuilder()
		.setCustomId(CustomId.PLAN_EVENT_DESCRIPTION)
		.setLabel("Description")
		.setMinLength(1)
		.setMaxLength(EVENT_DESCRIPTION_LENGTH)
		.setPlaceholder(
			"Additional info or vibe text. Markdown, new lines, and links are supported."
		)
		.setRequired(false)
		.setStyle(TextInputStyle.Paragraph);

	const imageInput = new TextInputBuilder()
		.setCustomId(CustomId.PLAN_EVENT_IMAGE_URL)
		.setLabel("Cover Image Link")
		.setPlaceholder("Image should be at least 800px wide and 320px tall.")
		.setRequired(false)
		.setStyle(TextInputStyle.Short);

	const actionRows = [
		titleInput,
		dateTimeInput,
		locationInput,
		imageInput,
		descriptionInput,
	].map((input) =>
		new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(input)
	);

	modal.addComponents(...actionRows);

	await interaction.showModal(modal);

	const timingEnd = performance.now();
	console.info({ message: "plan command timing", ms: timingEnd - timingStart });
};
