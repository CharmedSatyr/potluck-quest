import { redirect } from "next/navigation";
import createDiscordEvent from "~/actions/bot/event/create-discord-event";
import fetchUserDiscordGuilds from "~/actions/bot/user/fetch-user-discord-guilds";
import createEvent from "~/actions/event/create-event";
import createSlots from "~/actions/slot/create-slots";
import { auth } from "~/auth";
import { NO_GUILD_ID } from "~/constants/no-guild-id";
import genPageMetadata from "~/seo";
import {
	buildEventInputFromParams,
	buildSlotDataFromParams,
} from "~/utilities/build-from-params";
import { eventInputToData } from "~/utilities/event-input-to-data";

export const metadata = genPageMetadata({ title: "Plan" });

type Props = {
	searchParams: Promise<{ [key: string]: string }>;
};

const PlanConfirmPage = async ({ searchParams }: Props) => {
	const session = await auth();

	if (!session?.user?.id) {
		redirect("/oauth"); // Middleware should already guarantee loggedIn
	}

	const params = await searchParams;
	const queryString = "?" + new URLSearchParams(params).toString();

	const guildId = params["guild-option"];

	const eventInput = await buildEventInputFromParams(searchParams);
	const eventData = eventInputToData(eventInput);

	const { description, endUtcMs, location, startUtcMs, title } = eventData;

	if (guildId && guildId !== NO_GUILD_ID) {
		/** Confirm user is authorized to create events in guild from (manipulatable) params. */
		const permittedGuilds = await fetchUserDiscordGuilds({
			userId: session?.user?.id,
		});

		if (!permittedGuilds.some((guild) => guild.guildId === guildId)) {
			redirect("/oauth");
		}

		const discordResult = await createDiscordEvent({
			description,
			endUtcMs,
			guildId,
			location,
			startUtcMs,
			title,
		});

		if (!discordResult) {
			console.warn("Failed to create Discord event");
			// TODO: Add some error messaging via toast
			redirect("/plan".concat(queryString));
		}
	}

	const [result] = await createEvent({
		...eventData,
		createdBy: session.user.id,
	});

	if (!result?.code) {
		console.warn("No code created for new event:", JSON.stringify(eventData));
		// TODO: Add some error messaging via toast
		redirect("/plan".concat(queryString));
	}

	const slotData = await buildSlotDataFromParams(searchParams);

	if (slotData.length > 0) {
		const slots = await createSlots({
			code: result.code,
			slots: slotData as NonEmptySlotDataArray,
		});

		// TODO: Add more handling if problem adding slots.
		if (slots.length !== slotData.length) {
			console.warn(
				"Failed to create slots.",
				"eventData:",
				JSON.stringify(eventData),
				"slotData:",
				JSON.stringify(slotData)
			);
		}
	}

	redirect(`/event/${result.code}`);
};

export default PlanConfirmPage;
