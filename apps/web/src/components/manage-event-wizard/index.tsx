"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import PlanEventForm, {
	PlanEventFormFallback,
} from "~/components/plan-event-form";
import PlanFoodForm, {
	PlanFoodFormFallback,
} from "~/components/plan-food-form";
import SelectGuildForm from "~/components/select-guild-form";
import Suggestions from "~/components/suggestions";
import useAnchor, { scrollToAnchor } from "~/hooks/use-anchor";

type Props = {
	code: string | null;
	committedUsersBySlotPromise: Promise<Map<string, React.JSX.Element>>;
	eventInputPromise: Promise<EventInput>;
	loggedIn: boolean;
	mode: WizardMode;
	slotsPromise: Promise<SlotData[]>;
	userDiscordGuildsPromise: Promise<
		{
			guildId: string;
			name: string;
			iconUrl: string;
		}[]
	>;
};

export enum Step {
	CREATE_EVENT = "create-event",
	PLAN_FOOD = "plan-food",
	SELECT_SERVER = "select-server",
}

const ProgressIndicator = ({ mode }: { mode: WizardMode }) => {
	const [anchor = Step.CREATE_EVENT, scrollToAnchor] = useAnchor();

	useEffect(() => {
		if (anchor === Step.CREATE_EVENT) {
			scrollToAnchor(Step.CREATE_EVENT);
		}

		if (anchor === Step.PLAN_FOOD) {
			scrollToAnchor(Step.PLAN_FOOD);
		}

		if (mode === "create" && anchor === Step.SELECT_SERVER) {
			scrollToAnchor(Step.SELECT_SERVER);
		}
	}, [anchor, mode, scrollToAnchor]);

	/* TODO: Add a hover state to make it clearer you can click. */
	return (
		<div className="steps my-8 w-full">
			<button
				className="step step-secondary"
				onClick={() => scrollToAnchor(Step.CREATE_EVENT)}
			>
				Create an Event
			</button>

			<button
				className={`step ${anchor === Step.PLAN_FOOD || anchor === Step.SELECT_SERVER ? "step-secondary" : ""}`}
				onClick={() => scrollToAnchor(Step.PLAN_FOOD)}
			>
				Plan the Food
			</button>

			{mode === "create" && (
				<button
					className={`step ${anchor === Step.SELECT_SERVER ? "step-secondary" : ""}`}
					onClick={() => scrollToAnchor(Step.SELECT_SERVER)}
				>
					Select a Server
				</button>
			)}
		</div>
	);
};

const ManageEventWizard = ({
	code,
	committedUsersBySlotPromise,
	eventInputPromise,
	loggedIn,
	mode,
	slotsPromise,
	userDiscordGuildsPromise,
}: Props) => {
	const [suggestedSlots, setSuggestedSlots] = useState<SlotData[]>([]);

	const populateSuggestedSlots = (items: SlotData[]) => {
		setSuggestedSlots(items);
	};

	return (
		<div className="contrast-container flex w-full flex-col pt-14 md:w-11/12 lg:w-10/12 xl:w-9/12">
			<div className="carousel w-full">
				<div className="step-container carousel-item" id={Step.CREATE_EVENT}>
					<div className="step-content">
						{mode === "create" && (
							<h1 className="text-primary-gradient mb-4">Create an Event</h1>
						)}

						{mode === "edit" && (
							<h1 className="text-primary-gradient mb-4 flex items-center">
								Now Editing
								<Link
									href={`/event/${code}`}
									className="btn btn-secondary btn-sm ml-2 text-xl"
								>
									{code}
								</Link>
							</h1>
						)}

						<Suspense fallback={<PlanEventFormFallback />}>
							<PlanEventForm
								code={code}
								eventInputPromise={eventInputPromise}
								loggedIn={loggedIn}
								mode={mode}
							/>
						</Suspense>
					</div>
				</div>

				<div className="step-container carousel-item" id={Step.PLAN_FOOD}>
					<div className="step-content">
						<h1 className="text-primary-gradient">Plan the Food</h1>

						<div className="mb-12">
							<Suspense>
								{loggedIn ? (
									<Suggestions
										eventInputPromise={eventInputPromise}
										populate={populateSuggestedSlots}
									/>
								) : (
									<div>
										<button
											className="link"
											onClick={() => scrollToAnchor(Step.CREATE_EVENT)}
										>
											Create an Event
										</button>{" "}
										to continue.
									</div>
								)}
							</Suspense>
						</div>

						<Suspense fallback={<PlanFoodFormFallback />}>
							<PlanFoodForm
								code={code}
								committedUsersBySlotPromise={committedUsersBySlotPromise}
								eventInputPromise={eventInputPromise}
								mode={mode}
								slotsPromise={slotsPromise}
								suggestedSlots={suggestedSlots}
							/>
						</Suspense>
					</div>
				</div>

				{mode === "create" && (
					<div className="step-container carousel-item" id={Step.SELECT_SERVER}>
						<div className="step-content">
							<h1 className="text-primary-gradient">Select a Server</h1>
							<Suspense>
								<SelectGuildForm
									userDiscordGuildsPromise={userDiscordGuildsPromise}
								/>
							</Suspense>
						</div>
					</div>
				)}
			</div>

			<ProgressIndicator mode={mode} />
		</div>
	);
};

export default ManageEventWizard;
