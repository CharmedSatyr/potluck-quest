import { CacheType, Interaction, MessageFlags } from "discord.js";
import api from "~/constants/web-api.js";
import { checkAccountExists } from "~/services/web.js";

export const listener = async (interaction: Interaction<CacheType>) => {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	const hasPotluckAccount = await checkAccountExists({
		providerAccountId: interaction.user.id,
	});

	if (!hasPotluckAccount) {
		const signupUrl = api.AUTH_SETUP;

		await interaction.reply({
			content: `<@${interaction.user.id}>, your journey awaits! [Sign in to Potluck Quest](${signupUrl}) to continue.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error({
			message: "Error in chat input command listener",
			error,
		});

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			});
			return;
		}

		await interaction.reply({
			content: "There was an error while executing this command!",
			flags: MessageFlags.Ephemeral,
		});
	}
};
