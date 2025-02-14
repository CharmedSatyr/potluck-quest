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
		console.error({
			commandName: interaction.commandName,
			error,
			message: "Error in chat input command listener",
			timingMs: timingEnd - timingStart,
		});

		if (!interaction.isRepliable()) {
			console.warn({
				message:
					"Chat input command interaction expired before error reply could be send.",
			});
			return;
		}

		if (interaction.deferred) {
			await interaction.editReply({
				content: "There was an error while executing this command!",
			});
			return;
		}

		if (interaction.replied) {
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
