import { redirect } from "next/navigation";
import createEvent from "~/actions/db/create-event";
import createSlots from "~/actions/db/create-slots";
import { auth } from "~/auth";
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

	const eventInput = await buildEventInputFromParams(searchParams);
	const eventData = eventInputToData(eventInput);

	const [result] = await createEvent({
		...eventData,
		createdBy: session!.user!.id!, // Guaranteed by middleware
	});

	if (!result?.code) {
		console.warn("No code created for new event:", JSON.stringify(eventData));
		// TODO: Add some error messaging via toast
		const params = await searchParams;
		const queryString = "?" + new URLSearchParams(params).toString();
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
