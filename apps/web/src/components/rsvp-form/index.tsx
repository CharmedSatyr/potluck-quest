"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import Link from "next/link";
import { use, useActionState, useEffect, useRef, useState } from "react";
import { type DiscordEventMetadata } from "~/actions/bot/event/fetch-discord-event-metadata";
import { DiscordIcon } from "~/components/branding/discord-icon";
import LoadingIndicator from "~/components/loading-indicator";
import submitAction, {
	RsvpFormState,
} from "~/components/rsvp-form/submit-actions";
import WarningAlert from "~/components/warning-alert";

type Props = {
	code: string;
	currentRsvpPromise: Promise<{ response: "yes" | "no" }[]>;
	discordMetadata?: DiscordEventMetadata;
};

const RsvpForm = ({ code, currentRsvpPromise, discordMetadata }: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const [currentRsvp] = use(currentRsvpPromise);

	const [override, setOverride] = useState<boolean>(false);

	const [state, submit, isPending] = useActionState<RsvpFormState, FormData>(
		submitAction,
		{
			code,
			fields: { message: "" },
			message: "",
			success: false,
		}
	);

	useEffect(() => {
		setOverride(false);
	}, [currentRsvp, setOverride]);

	const attending = currentRsvp?.response === "yes";

	const BtnIcon = () =>
		attending ? (
			<CheckCircleIcon className="text-success size-4" />
		) : (
			<XCircleIcon className="text-error size-4" />
		);

	if (currentRsvp?.response && !override && !isPending) {
		return (
			<button
				className="btn btn-ghost btn-sm w-full p-0"
				disabled={isPending}
				type="button"
				onClick={() => {
					setOverride(true);
				}}
			>
				{isPending ? (
					<LoadingIndicator size={6} />
				) : (
					<>
						<BtnIcon />
						Attending
					</>
				)}
			</button>
		);
	}

	// Delegate RSVP to Discord if no RSVP because there is no Discord API for adding a user to an event.
	if (discordMetadata) {
		return (
			<Link
				className="btn btn-sm bg-blurple hover:bg-dark-blurple w-full"
				href={`https://discord.com/events/${discordMetadata.discordGuildId}/${discordMetadata.discordEventId}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<DiscordIcon className="size-4" /> RSVP
			</Link>
		);
	}

	return (
		<Form action={submit}>
			<button
				className="btn btn-sm w-full"
				disabled={dialogRef.current?.open}
				type="button"
				onClick={() => dialogRef.current?.showModal()}
			>
				{isPending ? <LoadingIndicator size={8} /> : "RSVP"}
			</button>
			<dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="text-lg font-bold">Will you attend?</h3>

					<div className="fieldset w-full">
						<label className="fieldset-label" htmlFor="rsvp-message">
							Add a note
						</label>
						<input
							className="input w-full"
							defaultValue={state.fields.message}
							disabled={isPending}
							id="rsvp-message"
							maxLength={256}
							name="message"
							type="search"
						/>
						<WarningAlert text={state.message} />
					</div>

					<div className="modal-action">
						<button
							aria-label="Yes"
							data-response="yes"
							className="btn btn-sm btn-success"
							disabled={isPending}
							name="response"
							type="submit"
							value="yes"
						>
							{isPending ? <LoadingIndicator size={8} /> : "Yes"}
						</button>

						<button
							aria-label="No"
							data-response="no"
							className="btn btn-sm btn-error"
							disabled={isPending}
							name="response"
							type="submit"
							value="no"
						>
							{isPending ? <LoadingIndicator size={8} /> : "No"}
						</button>

						<button
							aria-label="Cancel"
							className="btn btn-sm btn-soft"
							disabled={isPending}
							type="button"
							onClick={() => dialogRef.current?.close()}
						>
							Cancel
						</button>
					</div>
				</div>
			</dialog>
		</Form>
	);
};

export default RsvpForm;
