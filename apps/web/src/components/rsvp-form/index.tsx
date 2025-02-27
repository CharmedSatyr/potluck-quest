"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import Link from "next/link";
import { use, useActionState, useRef } from "react";
import { type DiscordEventMetadata } from "~/actions/bot/event/fetch-discord-event-metadata";
import { DiscordIcon } from "~/components/branding/discord-icon";
import LoadingIndicator from "~/components/loading-indicator";
import submitAction, {
	RsvpFormState,
} from "~/components/rsvp-form/submit-actions";

type Props = {
	code: string;
	currentRsvpPromise: Promise<{ response: "yes" | "no" }[]>;
	discordMetadata?: DiscordEventMetadata;
};

const RsvpForm = ({ code, currentRsvpPromise, discordMetadata }: Props) => {
	const [currentRsvp] = use(currentRsvpPromise);

	const dialogRef = useRef<HTMLDialogElement>(null);

	const [state, submit, isPending] = useActionState<RsvpFormState, FormData>(
		submitAction,
		{
			code,
			fields: { message: "" },
			success: false,
		}
	);

	const BtnIcon = () =>
		currentRsvp?.response === "yes" ? (
			<CheckCircleIcon className="text-success inline size-4 md:hidden" />
		) : (
			<XCircleIcon className="text-error inline size-4 md:hidden" />
		);

	// Delegate RSVP to Discord if no RSVP because there is no Discord API for adding a user to an event.
	if (discordMetadata) {
		return (
			<Link
				className="btn btn-sm bg-blurple hover:bg-dark-blurple w-full no-underline"
				href={`https://discord.com/events/${discordMetadata.discordGuildId}/${discordMetadata.discordEventId}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				{currentRsvp?.response ? (
					<>
						<BtnIcon /> Attending
					</>
				) : (
					<>
						<DiscordIcon className="inline size-4" /> RSVP
					</>
				)}
			</Link>
		);
	}

	return (
		<Form action={submit}>
			<button
				className="btn btn-sm btn-ghost w-full text-nowrap"
				disabled={dialogRef.current?.open}
				type="button"
				onClick={() => dialogRef.current?.showModal()}
			>
				{currentRsvp?.response && !isPending && (
					<span>
						<BtnIcon /> Attending
					</span>
				)}
				{isPending && <LoadingIndicator size={2} />}
				{!isPending && !currentRsvp?.response && "RSVP"}
			</button>

			<dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="text-lg font-bold">Will you attend?</h3>

					<div className="fieldset w-full">
						<label className="fieldset-label" htmlFor="rsvp-message">
							Add a note
						</label>
						<div className="input w-full">
							<span className="badge badge-info badge-xs">Optional</span>
							<input
								defaultValue={state.fields.message}
								disabled={isPending}
								id="rsvp-message"
								maxLength={256}
								name="message"
								type="search"
							/>
						</div>
					</div>

					<div className="modal-action">
						<button
							aria-label="Yes"
							data-response="yes"
							className="btn btn-sm btn-success"
							disabled={isPending}
							name="response"
							onClick={() => dialogRef.current?.close()}
							type="submit"
							value="yes"
						>
							{isPending ? <LoadingIndicator size={2} /> : "Yes"}
						</button>

						<button
							aria-label="No"
							data-response="no"
							className="btn btn-sm btn-error"
							disabled={isPending}
							name="response"
							onClick={() => dialogRef.current?.close()}
							type="submit"
							value="no"
						>
							{isPending ? <LoadingIndicator size={2} /> : "No"}
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
