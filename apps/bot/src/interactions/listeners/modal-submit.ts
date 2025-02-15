import { CacheType, Interaction, MessageFlags } from "discord.js";
import type { InteractionHandler } from "~/@types/handler.d.ts";
import { DELIMITER } from "~/constants/delimiter.js";

export const listener = async (interaction: Interaction<CacheType>) => {
	if (!interaction.isModalSubmit()) {
		return;
	}

	interaction.deferReply({ flags: MessageFlags.Ephemeral });

	const parsedCustomId = interaction.customId.split(DELIMITER)[0];

	const handler = interaction.client.handlers.get(parsedCustomId);

	if (!handler) {
		console.error(`No modal customId matching ${parsedCustomId} was found.`);
		return;
	}

	try {
		await (handler as InteractionHandler).execute(interaction);
	} catch (error) {
		console.error({ message: "Error in modal submit listener", error });

		await interaction.followUp({
			content: "There was an error while handling this event!",
			flags: MessageFlags.Ephemeral,
		});
	}
};
