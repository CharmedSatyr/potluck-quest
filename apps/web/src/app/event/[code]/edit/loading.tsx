import LoadingIndicator from "~/components/loading-indicator";
import { PlanEventFormFallback } from "~/components/plan-event-form";

const Loading = () => (
	<main className="contrast-container">
		<div className="step-container">
			<div className="step-content">
				<h1 className="text-primary-gradient mb-4 flex items-center">
					Now Editing
					<button className="btn btn-secondary btn-sm ml-2 text-xl no-underline">
						<LoadingIndicator size={6} />
					</button>
				</h1>
				<PlanEventFormFallback />
			</div>
		</div>
	</main>
);

export default Loading;
