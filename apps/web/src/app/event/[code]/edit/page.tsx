import { Metadata } from "next";
import { Suspense } from "react";
import findSlots from "~/actions/db/find-slots";
import { auth } from "~/auth";
import committedUsersBySlot from "~/components/committed-users-by-slot";
import ErrorBoundary from "~/components/error-boundary";
import ManageEventWizard from "~/components/manage-event-wizard";
import { PlanEventFormFallback } from "~/components/plan-event-form";
import genPageMetadata from "~/seo";
import { buildEventInputFromParams } from "~/utilities/build-from-params";

type MetadataProps = {
	params: Promise<{ code: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({
	params: paramsPromise,
}: MetadataProps): Promise<Metadata> => {
	const params = await paramsPromise;

	return genPageMetadata({ title: `Edit ${params?.code}` });
};

type Props = {
	params: Promise<{ code: string }>;
	searchParams: Promise<{ [key: string]: string }>;
};

const EditEventPage = async ({ params, searchParams }: Props) => {
	const { code } = await params;
	const session = await auth();
	const loggedIn = Boolean(session?.user?.id);

	return (
		<main className="flex h-full w-full flex-col items-center">
			<ErrorBoundary>
				<Suspense fallback={<PlanEventFormFallback />}>
					<ManageEventWizard
						code={code}
						committedUsersBySlotPromise={committedUsersBySlot(code)}
						eventInputPromise={buildEventInputFromParams(searchParams)}
						loggedIn={loggedIn}
						mode="edit"
						slotsPromise={findSlots({ code })}
					/>
				</Suspense>
			</ErrorBoundary>
		</main>
	);
};

export default EditEventPage;
