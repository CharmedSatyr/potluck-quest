import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";
import config from "~/constants/env-config.js";
import { getUserTimezone } from "~/services/potluck-quest.js";
import {
	formatTimestampForView,
	getTimezoneOffsetName,
} from "~/utilities/date-time.js";
import { removeBlurbTruncateAndGetCode } from "~/utilities/description-blurb.js";

// TODO: Add cooldowns https://discordjs.guide/additional-features/cooldowns.html#resulting-code
export const data = new SlashCommandBuilder()
	.setName("view")
	.setDescription("View existing Potluck Quest events");

export const execute = async (interaction: ChatInputCommandInteraction) => {
	const events = await interaction.guild?.scheduledEvents.fetch();

	const pqEvents = events?.filter(
		(event) =>
			(event.creatorId === config.CLIENT_ID && event.isScheduled()) ||
			event.isActive()
	);

	if (!pqEvents || pqEvents.size === 0 || !interaction.guild) {
		await interaction.reply({
			content: "No Potluck Quest events found. Type `/plan` to get started!",
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	const timezone = await getUserTimezone(interaction.user.id);
	const { offsetNameLong, offsetNameShort } = getTimezoneOffsetName(timezone);

	const fields = pqEvents.map((event) => {
		const { code } = removeBlurbTruncateAndGetCode(event.description);

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
		await interaction.reply({
			content: `Too many events to view using this command. Visit [Potluck Quest](${config.PQ_WEB_BASE_URL}) for more options.`,
			flags: MessageFlags.Ephemeral,
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

	await interaction.reply({
		embeds: [embed],
		flags: MessageFlags.Ephemeral,
	});
};
