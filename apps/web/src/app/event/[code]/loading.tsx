import { EventSkeletonFallback } from "~/components/event-skeleton/event-skeleton";
import { RsvpFormFallback } from "~/components/rsvp-form";
import { RsvpTableFallback } from "~/components/rsvp-table";
import { SlotManagerFallback } from "~/components/slot-manager";

const Loading = () => (
	<div className="-m-6 flex h-full w-full flex-col rounded-xl bg-base-100 px-6 pb-20 pt-6 shadow">
		<div className="flex flex-col flex-wrap">
			<div className="w-full md:w-10/12">
				<EventSkeletonFallback />
			</div>

			<div className="mt-4 w-full md:mt-0 md:w-2/12">
				<RsvpFormFallback />
			</div>
		</div>

		<div className="mt-8">
			<SlotManagerFallback />
		</div>

		<div className="mt-8">
			<RsvpTableFallback />
		</div>
	</div>
);

export default Loading;
