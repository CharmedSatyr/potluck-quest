import { SparklesIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import LoadingIndicator from "~/components/loading-indicator";

type Props = {
	attendees: string;
	fetchSuggestions: () => Promise<void>;
	pending: boolean;
	setAttendees: Dispatch<SetStateAction<string>>;
};

const Prompt = ({
	attendees,
	fetchSuggestions,
	pending,
	setAttendees,
}: Props) => {
	return (
		<aside className="p-4">
			<h3 className="mt-0 text-base sm:text-xl">
				Need help planning your meal?
			</h3>

			<div className="fieldset">
				<label className="fieldset-label" htmlFor="attendees">
					Estimated attendees
				</label>

				<div className="flex gap-2">
					<input
						className="input input-sm"
						disabled={pending}
						placeholder="10"
						id="attendees"
						min={0}
						max={1000} // Arbitrary
						onChange={(e) => setAttendees(e?.target?.value)}
						type="number"
						value={attendees}
					/>
					<button
						className="btn btn-info btn-sm mb-2"
						type="button"
						disabled={pending || !attendees || attendees === "0"}
						onClick={fetchSuggestions}
					>
						{pending ? (
							<LoadingIndicator size={6} />
						) : (
							<>
								<SparklesIcon className="size-4" />
								Ask AI
							</>
						)}
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Prompt;
