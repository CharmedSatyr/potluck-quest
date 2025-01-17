"use client";

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
			iconURL: string;
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
					Select Discord Server
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
		<>
			<div className="carousel w-full">
				<div
					className="carousel-item flex w-full justify-center"
					id={Step.CREATE_EVENT}
				>
					<Suspense fallback={<PlanEventFormFallback />}>
						<PlanEventForm
							code={code}
							eventInputPromise={eventInputPromise}
							loggedIn={loggedIn}
							mode={mode}
						/>
					</Suspense>
				</div>

				<div
					className="carousel-item flex w-full flex-col items-center justify-center"
					id={Step.PLAN_FOOD}
				>
					<h1 className="text-primary-gradient">Plan the Food</h1>

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

				{mode === "create" && (
					<div
						className="carousel-item flex w-full flex-col items-center justify-center"
						id={Step.SELECT_SERVER}
					>
						<Suspense>
							<SelectGuildForm
								userDiscordGuildsPromise={userDiscordGuildsPromise}
							/>
						</Suspense>
					</div>
				)}
			</div>

			<ProgressIndicator mode={mode} />
		</>
	);
};

export default ManageEventWizard;
