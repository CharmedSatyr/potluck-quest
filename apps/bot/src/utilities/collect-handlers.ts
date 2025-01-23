import { Collection } from "discord.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import type { Handler } from "~/@types/handler.d.ts";

const handlersDirs = ["../interactions/handlers", "../guildEvents/handlers"];

const collectHandlers = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));

	const handlers = new Collection<string, Handler>();

	for (const dir of handlersDirs) {
		const handlersPath = path.resolve(__dirname, dir);
		const handlerFiles = fs.readdirSync(handlersPath);

		for (const file of handlerFiles) {
			const filePath = path.join(handlersPath, file);
			const handler = await import(filePath);

			if (!("data" in handler && "execute" in handler)) {
				console.warn(
					`[WARNING] The handler at ${filePath} is missing a required "data" or "execute" property.`
				);
				continue;
			}

			if (handler.data.customId) {
				handlers.set(handler.data.customId!, handler);
			}

			if (handler.data.eventName) {
				handlers.set(handler.data.eventName, handler);
			}
		}
	}

	return handlers;
};

export default collectHandlers;
