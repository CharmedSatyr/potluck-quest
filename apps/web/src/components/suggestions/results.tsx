import {
	ArrowPathIcon,
	BarsArrowDownIcon,
	InformationCircleIcon,
	SparklesIcon,
} from "@heroicons/react/24/outline";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { suggestions as suggestionsSchema } from "@potluck/validation";
import { useState } from "react";
import { z } from "zod";

const Results = ({
	populate,
	reset,
	suggestions,
}: {
	populate: (items: SlotData[]) => void;
	reset: () => void;
	suggestions: z.infer<typeof suggestionsSchema>;
}) => {
	const [expanded, setExpanded] = useState<boolean>(true);

	if (!suggestions) {
		return null;
	}

	return (
		<div className="collapse w-full bg-base-300">
			<input
				type="checkbox"
				checked={expanded}
				onChange={() => setExpanded(!expanded)}
			/>

			<div className="collapse-title flex w-full items-center justify-between">
				<div className="flex items-center bg-gradient-to-r from-yellow-100 to-orange-400 bg-clip-text text-xl font-medium text-transparent">
					<SparklesIcon className="mr-1 inline size-5 text-yellow-200" />
					Suggestions
				</div>
				<div>
					{expanded ? (
						<ChevronUpIcon className="size-5" />
					) : (
						<ChevronDownIcon className="size-5" />
					)}
				</div>
			</div>
			<div className="collapse-content">
				<p>
					<InformationCircleIcon className="mr-2 inline size-6 text-info" />
					{suggestions.advice}
				</p>

				<h3 className="m-0 text-lg">What to Request</h3>
				<div className="overflow-x-auto">
					<table className="table table-xs">
						<thead>
							<tr>
								<th></th>
								<th>Type</th>
								<th>Count</th>
							</tr>
						</thead>
						<tbody>
							{suggestions.slots.map((slot) => (
								<tr key={slot.item}>
									<th>{slot.order}</th>
									<td>{slot.item}</td>
									<td>{slot.count}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex w-full justify-between">
					<button
						className="btn btn-secondary btn-sm"
						onClick={() => {
							setExpanded(false);

							populate(suggestions.slots);
						}}
						type="button"
					>
						<BarsArrowDownIcon className="size-4" />
						Use Suggestions
					</button>
					<button
						className="btn btn-warning btn-sm"
						onClick={reset}
						type="button"
					>
						<ArrowPathIcon className="size-4" />
						Reset
					</button>
				</div>
			</div>
		</div>
	);
};

export default Results;
