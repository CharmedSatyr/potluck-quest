import { EventSkeletonFallback } from "~/components/event-skeleton/event-skeleton";
import { RsvpFormFallback } from "~/components/rsvp-form";
import { RsvpTableFallback } from "~/components/rsvp-table";
import { SlotManagerFallback } from "~/components/slot-manager";

const Loading = () => (
	<div className="flex h-full w-full flex-col rounded-xl bg-base-100 -m-6 pt-6 pb-20 px-6">
		<div className="flex flex-col flex-wrap">
			<div className="w-full md:w-10/12">
				<EventSkeletonFallback />
			</div>

			<div className="w-full md:w-2/12 mt-4 md:mt-0">
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
