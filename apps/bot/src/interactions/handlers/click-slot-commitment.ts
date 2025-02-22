import { COMMITMENT_DESCRIPTION_LENGTH } from "@potluck/utilities/constants";
import {
	ActionRowBuilder,
	ButtonInteraction,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import { CustomId } from "~/constants/custom-id.js";
import { DELIMITER } from "~/constants/delimiter.js";
import { slotsCache } from "~/utilities/cache.js";
import getRandomPlaceholder from "~/utilities/get-random-placeholder.js";

export const data = { customId: CustomId.CLICK_SLOT_COMMITMENT };

export const execute = async (interaction: ButtonInteraction) => {
	const [, slotId] = interaction.customId.split(DELIMITER);

	const cachedData = slotsCache.get<{ code: string; slot: Slot }>(slotId);

	if (!cachedData) {
		throw new Error("No cached data found in click slot commitment.");
	}

	const { slot } = cachedData;
	const { needed } = slot;

	const modal = new ModalBuilder()
		.setCustomId(
			CustomId.COMMITMENT_DETAILS_MODAL.concat(DELIMITER).concat(slotId)
		)
		.setTitle("Add Commitment Details");

	const quantityInput = new TextInputBuilder()
		.setCustomId(CustomId.COMMITMENT_DETAILS_QUANTITY)
		.setLabel(`How many will you bring? (Max: ${needed})`)
		.setPlaceholder("1")
		.setStyle(TextInputStyle.Short)
		.setMaxLength(3)
		.setRequired(false);

	const placeholders = [
		"Ravenloft-style smoked brisket and potatoes",
		"A potion of savory broth infused with forest herbs",
		"Mystical moonberry pie, baked with stardust",
		"Glistening elven ham, honeyed to perfection",
		"Golden roasted chicken, dusted with ancient spice",
		"A dish of dragonfruit and enchanted greens",
		"Spicy elven bread, crisped over a magical flame",
		"A hearty stew, loaded with dwarven mine fungus",
	];

	const descriptionInput = new TextInputBuilder()
		.setCustomId(CustomId.COMMITMENT_DETAILS_NOTE)
		.setLabel("Add a description")
		.setPlaceholder(getRandomPlaceholder(placeholders))
		.setStyle(TextInputStyle.Short)
		.setMaxLength(COMMITMENT_DESCRIPTION_LENGTH)
		.setRequired(false);

	const components = [
		new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput),
	];

	if (needed > 1) {
		components.unshift(
			new ActionRowBuilder<TextInputBuilder>().addComponents(quantityInput)
		);
	}

	modal.addComponents(...components);

	await interaction.showModal(modal);
};
