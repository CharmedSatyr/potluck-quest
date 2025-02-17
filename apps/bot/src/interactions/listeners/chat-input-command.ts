import {
	CacheType,
	DiscordAPIError,
	Interaction,
	MessageFlags,
} from "discord.js";

export const listener = async (interaction: Interaction<CacheType>) => {
	const timingStart = performance.now();
	if (!interaction.isChatInputCommand()) {
		return;
	}

	if (!interaction.guild?.id) {
		throw new Error("Interaction lacks guild ID");
	}

	if (!interaction.inGuild()) {
		throw new Error("User is not in guild");
	}

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		throw new Error(
			`No command matching ${interaction.commandName} was found.`
		);
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		const timingEnd = performance.now();

		if (
			!interaction.isRepliable() ||
			(error instanceof DiscordAPIError && error.code === 10062)
		) {
			console.warn({
				message:
					"Chat input command interaction expired before error reply could be sent.",
			});
			return;
		}

		console.error({
			commandName: interaction.commandName,
			error: error instanceof Error ? error.stack : String(error),
			message: "Error in chat input command listener",
			timingMs: timingEnd - timingStart,
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
