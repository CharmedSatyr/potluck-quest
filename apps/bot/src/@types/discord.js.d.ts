import { Command, Handler } from "./discord.js-extensions";
import { Client, Collection } from "discord.js";

/** Extended types from discord.js */
declare module "discord.js" {
	interface Client {
		commands: Collection<string, Command>;
		handlers: Collection<string, Handler>;
	}
}
