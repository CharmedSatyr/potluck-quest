"use client";

import Form from "next/form";
import { useActionState, useEffect, useRef, useState } from "react";
import { updateTimezoneAction } from "~/components/timezone-selector/update-timezone-action";
import { SUPPORTED_TIMEZONES } from "~/constants/timezone";

type Props = {
	currentTimezone: SupportedTimezone;
};

const TimezoneSelector = ({ currentTimezone }: Props) => {
	const [state, submit, isPending] = useActionState(updateTimezoneAction, {
		timezone: currentTimezone,
	});

	// Select re-renders before action state is updated
	const [selection, setSelection] = useState(state.timezone);
	useEffect(() => {
		setSelection(state.timezone);
	}, [state.timezone]);

	const formRef = useRef<HTMLFormElement>(null);

	return (
		<Form action={submit} className="inline" ref={formRef}>
			<select
				className="select select-secondary select-sm"
				disabled={isPending}
				onChange={() => formRef.current?.requestSubmit()}
				name="timezone"
				value={selection}
			>
				{SUPPORTED_TIMEZONES.map((timezone) => (
					<option key={timezone} value={timezone}>
						{timezone}
					</option>
				))}
			</select>
		</Form>
	);
};

export default TimezoneSelector;
