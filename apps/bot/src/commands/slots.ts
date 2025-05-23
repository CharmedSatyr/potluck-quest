import { EVENT_CODE_LENGTH } from "@potluck/utilities/constants";
import { code } from "@potluck/utilities/validation";
import {
	ChatInputCommandInteraction,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";
import webApi from "~/constants/web-api.js";
import { checkAccountExists } from "~/services/web.js";
import { showEventsDropdown } from "~/utilities/slots/show-events-dropdown.js";
import { showSlotsButtons } from "~/utilities/slots/show-slots-buttons.js";

export const data = new SlashCommandBuilder()
	.setName("slots")
	.setDescription("See slots for a Potluck Quest event")
	.addStringOption((option) =>
		option
			.setName("code")
			.setDescription(
				"Potluck Quest event code. Use /view to see available event codes."
			)
			.setMinLength(EVENT_CODE_LENGTH)
			.setMaxLength(EVENT_CODE_LENGTH)
			.setRequired(false)
	);

export const execute = async (interaction: ChatInputCommandInteraction) => {
	const timingStart = performance.now();

	await interaction.deferReply({ flags: MessageFlags.Ephemeral });

	const hasPotluckAccount = await checkAccountExists({
		providerAccountId: interaction.user.id,
	});

	if (!hasPotluckAccount) {
		await interaction.editReply({
			content: `<@${interaction.user.id}>, your journey awaits! [Sign in to Potluck Quest](${webApi.AUTH_SETUP} ) to continue.`,
		});
		return;
	}

	const input = interaction.options.getString("code");

	const parsed = code.safeParse(input);

	if (!parsed.success) {
		await showEventsDropdown(interaction);

		const timingEnd = performance.now();
		console.info({
			message: "slots (dropdown) command timing",
			ms: timingEnd - timingStart,
		});

		return;
	}

	await showSlotsButtons(parsed.data, interaction);

	const timingEnd = performance.now();
	console.info({
		message: "slots (buttons) command timing",
		ms: timingEnd - timingStart,
	});
};
