import { CacheType, Interaction, MessageFlags } from "discord.js";
import type { InteractionHandler } from "~/@types/handler.d.ts";

export const listener = async (interaction: Interaction<CacheType>) => {
	if (!interaction.isStringSelectMenu()) {
		return;
	}

	await interaction.deferReply({ flags: MessageFlags.Ephemeral });

	const handler = interaction.client.handlers.get(interaction.customId);

	if (!handler) {
		console.error(
			`No string select menu customId matching ${interaction.customId} was found.`
		);
		return;
	}

	try {
		await (handler as InteractionHandler).execute(interaction);
	} catch (error) {
		console.error({ message: "Error in string select menu listener", error });

		await interaction.followUp({
			content: "There was an error while handling this event!",
			flags: MessageFlags.Ephemeral,
		});
	}
};
