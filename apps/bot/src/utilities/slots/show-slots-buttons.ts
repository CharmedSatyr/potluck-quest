import { code as codeSchema, z } from "@potluck/utilities/validation";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	MessageComponentInteraction,
	MessageFlags,
	StringSelectMenuInteraction,
} from "discord.js";
import { CustomId } from "~/constants/custom-id.js";
import { DELIMITER } from "~/constants/delimiter.js";
import config from "~/constants/env-config.js";
import { getSlots } from "~/services/web.js";

export const showSlotsButtons = async (
	code: z.infer<typeof codeSchema>,
	interaction: ChatInputCommandInteraction | StringSelectMenuInteraction
) => {
	const slots = await getSlots({ code });

	if (!slots) {
		await interaction.reply({
			content: `Failed to retrieve slots for event code ${code}`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	if (slots.length === 0) {
		await interaction.reply({
			content: `No slots have been created for [${code}](${config.PQ_WEB_BASE_URL}/event/${code}). Ask the host to create some!`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const rows: ActionRowBuilder<ButtonBuilder>[] = [];
	let currentRow = new ActionRowBuilder<ButtonBuilder>();

	slots
		// Sort completed slots to end
		.sort((a, b) => {
			if (b.needed === 0) {
				return -1;
			}

			if (a.needed === 0) {
				return 1;
			}

			return 0;
		})
		.forEach((slot, index) => {
			const button = new ButtonBuilder()
				.setCustomId(
					CustomId.CLICK_SLOT_COMMITMENT.concat(DELIMITER).concat(slot.id)
				)
				.setLabel(`${slot.needed}: ${slot.item}`)
				.setStyle(ButtonStyle.Primary)
				.setDisabled(slot.needed <= 0);

			currentRow.addComponents(button);

			if ((index + 1) % 5 === 0 || index === slots.length - 1) {
				rows.push(currentRow);
				currentRow = new ActionRowBuilder<ButtonBuilder>();
			}
		});

	const prompt = await interaction.reply({
		content:
			"Here's how many of each item is still needed. What would you like to bring?",
		components: rows,
		flags: MessageFlags.Ephemeral,
	});

	// Remove the buttons on click or timeout so they can't be reused.
	const collectorFilter = (i: MessageComponentInteraction): boolean =>
		i.isButton() &&
		i.customId.split(DELIMITER)[0] === CustomId.CLICK_SLOT_COMMITMENT;

	try {
		await prompt.awaitMessageComponent({
			filter: collectorFilter,
			time: 60_000,
		});
		await prompt.delete();
	} catch (err) {
		console.error(err);

		await interaction.editReply({
			content: "Confirmation not received within 1 minute. Please try again.",
			components: [],
		});
	}
};
