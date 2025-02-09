import { Dispatch, SetStateAction, use, useState } from "react";
import FailureWarning from "~/components/suggestions/failure-warning";
import Prompt from "~/components/suggestions/prompt";
import Results from "~/components/suggestions/results";
import useSlotSuggestions from "~/hooks/use-slot-suggestions";

type Props = {
	attendees: string;
	hookReturn: {
		suggestions: string;
		fetchSuggestions: () => Promise<void>;
		pending: boolean;
		reset: () => void;
	};
	populate: (items: SlotData[]) => void;
	setAttendees: Dispatch<SetStateAction<string>>;
};

const Suggestions = ({
	attendees,
	hookReturn,
	populate,
	setAttendees,
}: Props) => {
	const { suggestions: result, fetchSuggestions, pending, reset } = hookReturn;

	// TODO: Use a form/useActionState?
	if (result && !pending) {
		try {
			const suggestions = JSON.parse(result);
			return (
				<Results populate={populate} reset={reset} suggestions={suggestions} />
			);
		} catch (err) {
			console.log("Failed to fetch AI suggestions", err);

			return (
				<FailureWarning errorMessage={JSON.stringify(err)} reset={reset} />
			);
		}
	}

	return (
		<Prompt
			attendees={attendees}
			fetchSuggestions={fetchSuggestions}
			pending={pending}
			setAttendees={setAttendees}
		/>
	);
};

const SuggestionsContainer = ({
	eventInputPromise,
	populate,
}: {
	eventInputPromise: Promise<EventInput>;
	populate: (items: SlotData[]) => void;
}) => {
	const eventInput = use(eventInputPromise);
	const [attendees, setAttendees] = useState<string>("0");
	const hookReturn = useSlotSuggestions(eventInput, Number(attendees));

	const { title, startDate, startTime, location } = eventInput;

	if (!title || !startDate || !startTime || !location) {
		return null;
	}

	return (
		<div className="flex w-full justify-center">
			<div
				className="rounded-xl border-base-300 bg-base-200 shadow-sm transition-all duration-300 ease-in-out"
				style={{
					maxWidth: hookReturn.suggestions && !hookReturn.pending ? 560 : 420,
				}}
			>
				<Suggestions
					attendees={attendees}
					hookReturn={hookReturn}
					populate={populate}
					setAttendees={setAttendees}
				/>
			</div>
		</div>
	);
};

export default SuggestionsContainer;
