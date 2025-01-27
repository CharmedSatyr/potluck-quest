import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import DeleteSlotButton from "~/components/plan-food-form/delete-slot-button";
import enterToNextRef from "~/utilities/enter-to-next-ref";

type Props = {
	change: (index: number, value: string, count: string) => void;
	count: string;
	hasCommitments: boolean;
	id?: string;
	index: number;
	item: string;
	remove: (index: number, id?: string) => void;
};

const SlotInput = ({
	change,
	count,
	hasCommitments,
	id,
	index,
	item,
	remove,
}: Props) => {
	const itemRef = useRef<HTMLInputElement>(null);
	const countRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex w-full flex-wrap items-end justify-between sm:flex-nowrap sm:items-center">
			<div className="mb:0 order-3 sm:order-1 sm:-mb-8">
				<DeleteSlotButton
					hasCommitments={hasCommitments}
					id={id}
					index={index}
					remove={remove}
				/>
			</div>

			<div className="form-control order-2 w-full sm:order-2 sm:w-7/12">
				<label className="label label-text" htmlFor={`item-${index}`}>
					What&apos;s Needed
				</label>
				<input
					className="input-text input input-bordered text-sm sm:text-base"
					id={`item-${index}`}
					enterKeyHint="next"
					maxLength={256}
					minLength={1}
					name={`item-${index}`}
					onChange={(e) =>
						change(index, e.target.value, countRef.current?.value ?? "0")
					}
					onKeyDown={(e) => enterToNextRef(e, countRef)}
					ref={itemRef}
					required
					type="search"
					value={item}
				/>
			</div>

			<div className="form-control order-2 sm:order-3">
				<label className="label label-text" htmlFor={`count-${index}`}>
					Signups Needed
				</label>
				<div className="join">
					<button
						aria-label={`decrement-count-${index}-button`}
						className="btn join-item input-bordered"
						onClick={() => {
							countRef.current?.stepDown();
							change(
								index,
								itemRef.current?.value ?? "",
								countRef.current?.value ?? "0"
							);
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
						className="input join-item input-bordered max-w-20"
						enterKeyHint="next"
						id={`count-${index}`}
						inputMode="numeric"
						max="1000" // Arbitrary
						min="0"
						name={`count-${index}`}
						onChange={(e) =>
							change(index, itemRef.current?.value ?? "", e.target.value)
						}
						ref={countRef}
						required
						type="number"
						value={count}
					/>
					<button
						aria-label={`increment-count-${index}-button`}
						className="btn join-item input-bordered"
						onClick={() => {
							countRef.current?.stepUp();
							change(
								index,
								itemRef.current?.value ?? "",
								countRef.current?.value ?? "0"
							);
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
			{id && (
				<input
					className="hidden"
					defaultValue={id}
					name={`id-${index}`}
					required
					type="text"
				/>
			)}
		</div>
	);
};

export default SlotInput;
