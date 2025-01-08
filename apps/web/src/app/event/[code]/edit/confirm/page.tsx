import { Metadata } from "next";
import { redirect } from "next/navigation";
import updateEvent from "~/actions/db/update-event";
import upsertSlots from "~/actions/db/upsert-slots";
import genPageMetadata from "~/seo";
import {
	buildEventInputFromParams,
	buildSlotDataFromParams,
} from "~/utilities/build-from-params";
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

	if (Object.values(eventData).filter((value) => Boolean(value)).length === 0) {
		redirect(`/event/${code}`);
	}

	const [result] = await updateEvent({
		...eventData,
		code,
	});

	if (!result.code) {
		// TODO: Add some error messaging via toast
		redirect(`/event/${code}`);
	}

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
