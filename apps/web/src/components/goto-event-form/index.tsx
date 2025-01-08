"use client";

import LoadingIndicator from "../loading-indicator";
import WarningAlert from "../warning-alert";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import findEventExistsRedirect from "~/components/goto-event-form/find-event-exists-redirect";
import { EVENT_CODE_LENGTH } from "~/constants/event-code-length";

export type GotoEventFormState = {
	code: string;
	message: string;
	success: boolean;
};

const GotoEventForm = () => {
	const [state, formAction, isPending] = useActionState<
		GotoEventFormState,
		FormData
	>(findEventExistsRedirect, {
		code: "",
		message: "",
		success: false,
	});

	return (
		<form className="form-control" action={formAction}>
			<div className="input input-bordered flex w-full items-center">
				<MagnifyingGlassIcon className="mr-2 size-6" />
				<input
					defaultValue={state?.code ? state.code : undefined}
					minLength={EVENT_CODE_LENGTH}
					maxLength={EVENT_CODE_LENGTH}
					name="code"
					placeholder="238JK"
					type="search"
				/>
			</div>
			<button
				disabled={isPending}
				className="btn btn-secondary mt-2 text-xl"
				type="submit"
			>
				{isPending ? <LoadingIndicator size={10} /> : "Find an Event"}
			</button>
			<WarningAlert text={state?.message} />
		</form>
	);
};

export default GotoEventForm;
