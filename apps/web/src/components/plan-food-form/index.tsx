"use client";

import { MAX_SLOTS } from "@potluck/utilities/constants";
import { slot as slotSchema } from "@potluck/utilities/validation";
import Form from "next/form";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import deleteSlot from "~/actions/slot/delete-slot";
import { Step } from "~/components/manage-event-wizard";
import SlotInput from "~/components/plan-food-form/slot-input";

type Props = {
	code: string | null;
	committedUsersBySlotPromise: Promise<Map<string, React.JSX.Element>>;
	eventInputPromise: Promise<EventInput>;
	mode: WizardMode;
	slotsPromise: Promise<SlotData[]>;
	suggestedSlots: SlotData[];
};

const PlanFoodForm = ({
	code,
	committedUsersBySlotPromise,
	eventInputPromise,
	mode,
	slotsPromise,
	suggestedSlots,
}: Props) => {
	const eventInput = use(eventInputPromise);
	const prevSlots = use(slotsPromise);
	const committedUsersBySlot = use(committedUsersBySlotPromise);

	const [slots, setSlots] = useState<
		{ count: string; id?: string; item: string; order: number }[]
	>(() => {
		if (prevSlots.length > 0) {
			return prevSlots.map((slot) => ({
				count: slot.count.toString(),
				id: slot.id,
				item: slot.item,
				order: slot.order,
			}));
		}

		return [{ count: "0", item: "", order: 1 }];
	});

	useEffect(() => {
		const suggested = suggestedSlots.map((slot) => {
			return { ...slot, count: slot.count.toString() };
		});

		if (!suggested.length) {
			return;
		}

		setSlots((state) =>
			[
				...state.filter((slot) => slot.count !== "0" && slot.item !== ""),
				...suggested,
			].map((slot, i) => ({ ...slot, order: i + 1 }))
		);
	}, [setSlots, suggestedSlots]);

	const addSlot = () => {
		if (slots.length >= MAX_SLOTS) {
			return;
		}

		setSlots([...slots, { count: "0", item: "", order: slots.length + 1 }]);
	};

	const removeSlot = useCallback(
		async (index: number, id?: string) => {
			setSlots(
				slots
					.filter((_, i) => i !== index)
					.map((slot, i) => ({ ...slot, order: i + 1 }))
			);

			if (!id) {
				return;
			}

			await deleteSlot({ id });
		},
		[slots]
	);

	const handleSlotChange = (index: number, item: string, count: string) => {
		const updatedSlots = [...slots];
		updatedSlots[index].item = item;
		updatedSlots[index].count = count;

		setSlots(updatedSlots);
	};

	const slotsValid = useMemo(
		() =>
			slots.length > 0 &&
			slots.every((slot) => slotSchema.safeParse(slot).success),
		[slots]
	);

	const { title, startTime, startDate, location } = eventInput;

	const noEvent = !title || !startTime || !startDate || !location;

	const determineAction = () => {
		if (mode === "create") {
			return `/plan#${Step.SELECT_SERVER}`;
		}

		if (mode === "edit") {
			return `/event/${code}/edit/confirm`;
		}

		return "";
	};

	return (
		<Form action={determineAction()} data-testid="plan-food-form">
			{slots.map((slot, index) => (
				<div key={slot.order}>
					<SlotInput
						{...slot}
						change={handleSlotChange}
						hasCommitments={committedUsersBySlot.has(slot.id ?? "")}
						index={index}
						remove={removeSlot}
					/>
					{committedUsersBySlot.has(slot.id ?? "") && (
						<div className="mt-4 flex w-full items-center justify-center">
							<span className="text-sm font-light">Existing Commitments:</span>
							<span className="mx-2">
								{committedUsersBySlot.get(slot.id ?? "")}
							</span>
						</div>
					)}
					<div className="divider" />
				</div>
			))}

			{Object.entries(eventInput)
				.filter(([key]) => key !== "description")
				.filter(([, value]) => value !== "")
				.map(([key, value]) => (
					<input
						key={key}
						hidden
						name={key}
						readOnly
						type="text"
						value={value}
					/>
				))}

			<textarea
				hidden
				name="description"
				readOnly
				value={eventInput.description}
			/>

			<div className="my-3 flex w-full flex-wrap justify-between gap-2">
				<div className="flex grow justify-between">
					<button
						className="btn btn-secondary btn-sm"
						disabled={noEvent || slots.length >= MAX_SLOTS}
						onClick={addSlot}
						type="button"
					>
						Add Slot
					</button>

					<button
						className={`btn btn-accent btn-sm ${noEvent ? "btn-disabled pointer-events-none" : ""}`}
						formNoValidate={true}
					>
						Skip for Now
					</button>
				</div>

				<button
					className="btn btn-primary btn-sm w-full md:w-fit"
					disabled={noEvent || !slotsValid}
					type="submit"
				>
					{mode === "create" && "Continue"}
					{mode === "edit" && "Save and Continue"}
				</button>
			</div>
		</Form>
	);
};

export default PlanFoodForm;
