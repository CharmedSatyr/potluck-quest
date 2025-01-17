import { Collection } from "discord.js";
import { Command } from "discord.js-extensions";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const collectCommands = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));

	const commands = new Collection<string, Command>();

	const commandsPath = path.resolve(__dirname, "../commands");
	const commandFiles = fs.readdirSync(commandsPath);

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command: Command = await import(filePath);

		if ("data" in command && "execute" in command) {
			commands.set(command.data.name, command);
		} else {
			console.warn(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}

	return commands;
};

export default collectCommands;
