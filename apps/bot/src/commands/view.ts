import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";
import config from "~/constants/env-config.js";
import webApi from "~/constants/web-api.js";
import {
	checkAccountExists,
	getPotluckCodesByDiscordIds,
	getUserTimezone,
} from "~/services/web.js";
import {
	formatTimestampForView,
	getTimezoneOffsetName,
} from "~/utilities/date-time.js";

export const data = new SlashCommandBuilder()
	.setName("view")
	.setDescription("View existing Potluck Quest events");

export const execute = async (interaction: ChatInputCommandInteraction) => {
	const timingStart = performance.now();

	await interaction.deferReply({ flags: MessageFlags.Ephemeral });

	const events = await interaction.guild?.scheduledEvents.fetch();

	const pqEvents = events?.filter(
		(event) =>
			(event.creatorId === config.CLIENT_ID && event.isScheduled()) ||
			event.isActive()
	);

	if (!pqEvents || pqEvents.size === 0 || !interaction.guild) {
		await interaction.editReply({
			content: `No [Potluck Quest](${config.PQ_WEB_BASE_URL}) events found. Type \`/plan\` to get started!`,
		});
		return;
	}

	const [hasPotluckAccount, timezone] = await Promise.all([
		checkAccountExists({
			providerAccountId: interaction.user.id,
		}),
		getUserTimezone({ discordUserId: interaction.user.id }),
	]);

	if (!hasPotluckAccount) {
		await interaction.editReply({
			content: `<@${interaction.user.id}>, your journey awaits! [Sign in to Potluck Quest](${webApi.AUTH_SETUP} ) to continue.`,
		});
		return;
	}

	const { offsetNameLong, offsetNameShort } = getTimezoneOffsetName(timezone);

	const codesByIds = await getPotluckCodesByDiscordIds({
		discordEventIds: pqEvents.map((event) => event.id) as [string, ...string[]],
	});

	const fields = pqEvents.map((event) => {
		const code = codesByIds[event.id];

		return [
			{
				name: "\u200B",
				value: `${event.name}`,
				inline: true,
			},
			{
				name: "\u200B",
				value: formatTimestampForView(event.scheduledStartTimestamp, timezone),
				inline: true,
			},
			{
				name: "\u200B",
				value: code
					? `[${code}](https://www.potluck.quest/event/${code})`
					: "\u200B",
				inline: true,
			},
		];
	});

	// Add headings above the first row of fields.
	fields[0][0].name = "Name";
	fields[0][1].name = "When";
	fields[0][2].name = "Code";

	const flattened = fields.flat();

	if (flattened.length > 25) {
		await interaction.editReply({
			content:
				"Too many events to view using this command. Check the scheduled events for this server to see a full list.",
		});
		return;
	}

	const embed = new EmbedBuilder()
		.setTitle(`🍽️ Upcoming Events`)
		.setDescription(
			`Times displayed in ${offsetNameLong} (${offsetNameShort}):`
		)
		.setColor("#FF8A50") // PQ Primary orange
		.addFields(flattened)
		.setTimestamp()
		.setAuthor({
			name: interaction.guild.name,
			iconURL: interaction.guild.iconURL() ?? undefined,
		})
		.setFooter({
			text: "Change your timezone at potluck.quest/settings",
		});

	await interaction.editReply({
		embeds: [embed],
	});

	const timingEnd = performance.now();
	console.info({ message: "view command timing", ms: timingEnd - timingStart });
};
