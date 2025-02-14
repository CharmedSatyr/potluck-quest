import { StringSelectMenuInteraction } from "discord.js";
import { CustomId } from "~/constants/custom-id.js";
import { showSlotsButtons } from "~/utilities/slots/show-slots-buttons.js";

export const data = { customId: CustomId.SLOTS_SELECT_EVENT };

export const execute = async (interaction: StringSelectMenuInteraction) => {
	if (!interaction.isStringSelectMenu()) {
		return;
	}

	await showSlotsButtons(interaction.values[0], interaction);
};
