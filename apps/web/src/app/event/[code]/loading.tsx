import { EventSkeletonFallback } from "~/components/event-skeleton/event-skeleton";

const Loading = () => (
	<div className="contrast-container h-screen">
		<EventSkeletonFallback />
	</div>
);

export default Loading;
