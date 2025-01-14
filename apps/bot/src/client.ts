import { Client, GatewayIntentBits, Partials, Events } from "discord.js";
import "dotenv/config";
import config from "~/constants/env-config";
import { listener as eventDeleteListener } from "~/guildEvents/listeners/delete";
import { listener as eventUpdateListener } from "~/guildEvents/listeners/update";
import { listener as eventUserAddListener } from "~/guildEvents/listeners/user-add";
import { listener as eventUserRemoveListener } from "~/guildEvents/listeners/user-remove";
import { listener as buttonClickListener } from "~/interactions/listeners/button-click";
import { listener as chatInputCommandListener } from "~/interactions/listeners/chat-input-command";
import { listener as modalSubmitListener } from "~/interactions/listeners/modal-submit";
import collectCommands from "~/utilities/collect-commands";
import collectHandlers from "~/utilities/collect-handlers";

const client = new Client({
	partials: [Partials.GuildScheduledEvent],
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildScheduledEvents],
});

client.once(Events.ClientReady, async (readyClient) => {
	console.log(`Logged in as ${readyClient.user.tag}!`);
	console.log(`Connected to ${readyClient.guilds.cache.size} guilds.`);

	client.commands = await collectCommands();
	console.log(`Collected ${client.commands.size} commands`);
	client.handlers = await collectHandlers();
	console.log(`Collected ${client.handlers.size} handlers`);
});

client.on(Events.InteractionCreate, chatInputCommandListener);
client.on(Events.InteractionCreate, modalSubmitListener);
client.on(Events.InteractionCreate, buttonClickListener);

client.on(Events.GuildScheduledEventUserAdd, eventUserAddListener);
client.on(Events.GuildScheduledEventUserRemove, eventUserRemoveListener);
client.on(Events.GuildScheduledEventUpdate, eventUpdateListener);
client.on(Events.GuildScheduledEventDelete, eventDeleteListener);

client.login(config.BOT_TOKEN);

export default client;
