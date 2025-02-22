"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { COMMITMENT_DESCRIPTION_LENGTH } from "@potluck/utilities/constants";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { useActionState, useRef } from "react";
import LoadingIndicator from "~/components/loading-indicator";
import { createCommitmentAction } from "~/components/slot-manager/submit-actions";
import { CreateCommitmentFormState } from "~/components/slot-manager/submit-actions.schema";

type Props = {
	commitmentsStillNeeded: number;
	slotId: string;
};

type CourseInputProps = {
	commitmentsStillNeeded: number;
	defaultValue: string;
};

const CountInput = ({
	commitmentsStillNeeded,
	defaultValue,
}: CourseInputProps) => {
	const countRef = useRef<HTMLInputElement>(null);

	return (
		<div className="fieldset">
			<label className="fieldset-label" htmlFor="quantity-input">
				Quantity You&apos;ll Bring
			</label>

			<div className="join">
				<button
					aria-label="decrement-quantity-button"
					className="btn join-item btn-sm rounded-l-md rounded-r-none"
					onClick={() => {
						countRef.current?.stepDown();
					}}
					type="button"
				>
					<MinusIcon
						className="h-4 w-4 text-white"
						fill="white"
						title="Subtract one"
					/>
				</button>
				<input
					className="input input-sm validator max-w-20 rounded-none" // join-item causes misalignment
					defaultValue={defaultValue}
					id="quantity-input"
					inputMode="numeric"
					max={commitmentsStillNeeded}
					min="1"
					name="quantity"
					ref={countRef}
					required
					type="number"
				/>
				<button
					className="btn join-item btn-sm rounded-l-none rounded-r-md"
					onClick={() => {
						countRef.current?.stepUp();
					}}
					type="button"
				>
					<PlusIcon
						className="h-4 w-4 text-white"
						fill="white"
						title="Add one"
					/>
				</button>
			</div>
		</div>
	);
};

const CreateCommitmentForm = ({ commitmentsStillNeeded, slotId }: Props) => {
	const path = usePathname();

	const [state, formAction, isPending] = useActionState<
		CreateCommitmentFormState,
		FormData
	>(createCommitmentAction, {
		fields: {
			description: "",
			quantity: "0",
		},
		message: "",
		path,
		slotId,
		success: false,
	});

	const isButtonDisabled = isPending || commitmentsStillNeeded === 0;

	return (
		<Form
			action={formAction}
			className="flex w-full flex-wrap items-end justify-between gap-2 md:flex-nowrap"
		>
			<div className="order-1 w-full md:order-2 md:max-w-1/2">
				<div className="input input-sm flex w-full items-center gap-2">
					<span className="badge badge-info badge-xs">Optional</span>
					<input
						aria-label="item-description"
						className="w-full"
						defaultValue={state?.fields.hosts}
						maxLength={COMMITMENT_DESCRIPTION_LENGTH}
						name="description"
						placeholder="Add a description"
						type="search"
					/>
				</div>
			</div>

			<div className="order-2 -mb-1 md:order-1">
				<CountInput
					commitmentsStillNeeded={commitmentsStillNeeded}
					defaultValue={state.fields.quantity}
				/>
			</div>

			<button
				className="btn btn-secondary btn-sm order-3"
				disabled={isButtonDisabled}
				type="submit"
			>
				{isPending ? <LoadingIndicator size={6} /> : "Save"}
			</button>
		</Form>
	);
};

export default CreateCommitmentForm;
