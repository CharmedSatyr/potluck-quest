import { CreateEventButton } from "~/components/start-cta/create-event-button";
import GotoEventForm from "~/components/start-cta/goto-event-form";

export const StartCta = () => {
	return (
		<div className="w-full xl:p-10">
			<div className="flex flex-col gap-2 text-center md:hidden">
				<CreateEventButton />

				<div className="divider-base divider">OR</div>

				<GotoEventForm />
			</div>

			<div className="hidden min-h-44 w-full md:flex">
				<div className="divider divider-horizontal divider-start w-full min-w-5/12">
					<CreateEventButton />
				</div>
				<div className="divider divider-horizontal">OR</div>
				<div className="divider divider-horizontal divider-end min-w-5/12">
					<GotoEventForm />
				</div>
			</div>
		</div>
	);
};
