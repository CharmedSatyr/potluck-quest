import { Metadata } from "next";
import { redirect } from "next/navigation";
import updateDiscordEvent from "~/actions/bot/event/update-discord-event";
import findEvent from "~/actions/event/find-event";
import updateEvent from "~/actions/event/update-event";
import upsertSlots from "~/actions/slot/upsert-slots";
import genPageMetadata from "~/seo";
import {
	buildEventInputFromParams,
	buildSlotDataFromParams,
} from "~/utilities/build-from-params";
import { diffEventData } from "~/utilities/diff-objects";
import { eventInputToData } from "~/utilities/event-input-to-data";

type MetadataProps = {
	params: Promise<{ code: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({
	params: paramsPromise,
}: MetadataProps): Promise<Metadata> => {
	const params = await paramsPromise;

	return genPageMetadata({ title: `${params?.code}` });
};

type Props = {
	params: Promise<{ code: string }>;
	searchParams: Promise<{ [key: string]: string }>;
};

const Page = async ({ params, searchParams }: Props) => {
	const { code } = await params;

	const eventInput = await buildEventInputFromParams(searchParams);
	const eventData = eventInputToData(eventInput);

	const [originalEventData] = await findEvent({ code });
	const diff = diffEventData(originalEventData, eventData);

	if (Object.keys(diff).length === 0) {
		redirect(`/event/${code}`);
	}

	const [result] = await updateEvent({
		...diff,
		code,
	});

	if (!result.code) {
		// TODO: Add some error messaging via toast
		redirect(`/event/${code}`);
	}

	updateDiscordEvent(code, { ...diff });

	const slotData = await buildSlotDataFromParams(searchParams);

	if (slotData.length > 0) {
		await upsertSlots({
			code,
			slots: slotData as NonEmptySlotDataArray,
		});

		// TODO: Add handling if problem adding slots.
	}

	redirect(`/event/${code}`);
};

export default Page;
