import { EVENT_CODE_LENGTH } from "@potluck/utilities/constants";
import { code } from "@potluck/utilities/validation";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
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
	const input = interaction.options.getString("code");

	const parsed = code.safeParse(input);

	if (!parsed.success) {
		await showEventsDropdown(interaction);
		return;
	}

	await showSlotsButtons(parsed.data, interaction);
};
