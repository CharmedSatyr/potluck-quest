import { PlanEventFormFallback } from "~/components/plan-event-form";

const Loading = () => (
	<main className="contrast-container">
		<div className="step-container">
			<div className="step-content">
				<h1 className="text-primary-gradient mb-4">Create an Event</h1>
				<PlanEventFormFallback />
			</div>
		</div>
	</main>
);

export default Loading;
