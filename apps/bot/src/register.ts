import { REST, Routes } from "discord.js";
import "dotenv/config";
import config from "~/config";
import collectCommands from "~/utilities/collect-commands";

const commands = collectCommands().map((command) => command.data.toJSON());

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN!);

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationCommands(config.CLIENT_ID!), {
			body: commands,
		});

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();
