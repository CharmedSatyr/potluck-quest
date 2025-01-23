// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Client, Collection } from "discord.js";
import type { Command, Handler } from "~/@types/handler.d.ts";

/** Extended types from discord.js */
declare module "discord.js" {
	interface Client {
		commands: Collection<string, Command>;
		handlers: Collection<string, Handler>;
	}
}
