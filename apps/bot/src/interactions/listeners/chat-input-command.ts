import {
	CacheType,
	DiscordAPIError,
	Interaction,
	MessageFlags,
} from "discord.js";
import api from "~/constants/web-api.js";
import { checkAccountExists } from "~/services/web.js";

export const listener = async (interaction: Interaction<CacheType>) => {
	const timingStart = performance.now();
	if (!interaction.isChatInputCommand()) {
		return;
	}

	if (!interaction.guild?.id) {
		await interaction.reply({
			content: `<@${interaction.user.id}> Please ensure you're creating the event on a server with **Potluck Quest Bot** installed and try again.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	if (!interaction.inGuild()) {
		await interaction.reply({
			content: `<@${interaction.user.id}> Please ensure you're a member of the server and try again.`,
			flags: MessageFlags.Ephemeral,
		});
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
		await interaction.reply({
			content: `<@${interaction.user.id}>, your journey awaits! [Sign in to Potluck Quest](${api.AUTH_SETUP}) to continue.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		const timingEnd = performance.now();
		console.info({
			message: "chat input command error timing",
			ms: timingEnd - timingStart,
		});

		if (error instanceof DiscordAPIError) {
			if (error.code === 10062) {
				console.warn(
					"Received an unknown interaction (likely from a previous session)."
				);
				return;
			}
		}

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
