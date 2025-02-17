import { CacheType, Interaction, MessageFlags } from "discord.js";
import type { InteractionHandler } from "~/@types/handler.d.ts";
import { DELIMITER } from "~/constants/delimiter.js";
import webApi from "~/constants/web-api.js";
import { checkAccountExists } from "~/services/web.js";

export const listener = async (interaction: Interaction<CacheType>) => {
	if (!interaction.isModalSubmit()) {
		return;
	}

	await interaction.deferReply();

	if (
		!(await checkAccountExists({
			providerAccountId: interaction.user.id,
		}))
	) {
		throw new Error(
			`<@${interaction.user.id}>, your journey awaits! [Sign in to Potluck Quest](${webApi.AUTH_SETUP} ) to create an account, and try again.`
		);
	}

	const parsedCustomId = interaction.customId.split(DELIMITER)[0];

	const handler = interaction.client.handlers.get(parsedCustomId);

	if (!handler) {
		console.error(`No modal customId matching ${parsedCustomId} was found.`);
		throw new Error();
	}

	try {
		await (handler as InteractionHandler).execute(interaction);
	} catch (error) {
		console.error({
			customId: parsedCustomId,
			message: "Error in modal submit listener",
			error: error instanceof Error ? error.stack : String(error),
		});

		const thrownMessage = error instanceof Error ? error.message : "";

		await interaction.deleteReply();

		await interaction.followUp({
			content: thrownMessage
				? thrownMessage
				: `<@${interaction.user.id}> There was an error while handling this event. Please try again.`,
			flags: MessageFlags.Ephemeral,
		});
	}
};
