"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { use, useActionState, useEffect, useState } from "react";
import { type DiscordEventMetadata } from "~/actions/bot/event/fetch-discord-event-metadata";
import { DiscordIcon } from "~/components/icons/discord";
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
			<CheckCircleIcon className="size-4 text-success" />
		) : (
			<XCircleIcon className="size-4 text-error" />
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
				className="btn btn-sm w-full bg-blurple hover:bg-dark-blurple"
				href={`https://discord.com/events/${discordMetadata.discordGuildId}/${discordMetadata.discordEventId}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<DiscordIcon className="size-4" /> RSVP
			</Link>
		);
	}

	return (
		<form action={submit} className="form-control gap-2 text-center">
			<p className="mb-0">Will you attend?</p>

			<button
				className="btn btn-primary btn-sm w-full"
				data-response="yes"
				disabled={isPending}
				name="response"
				type="submit"
				value="yes"
			>
				{isPending ? <LoadingIndicator size={6} /> : "Yes"}
			</button>

			<button
				className="btn btn-secondary btn-sm w-full"
				data-response="no"
				disabled={isPending}
				name="response"
				type="submit"
				value="no"
			>
				{isPending ? <LoadingIndicator size={6} /> : "No"}
			</button>

			<div className="form-control">
				<label className="label label-text" htmlFor="rsvp-message">
					Notes
				</label>
				<input
					className="input input-bordered w-full"
					defaultValue={state.fields.message}
					disabled={isPending}
					id="rsvp-message"
					maxLength={256}
					name="message"
					type="search"
				/>
				<WarningAlert text={state.message} />
			</div>
		</form>
	);
};

export default RsvpForm;

export const RsvpFormFallback = () => {
	return (
		<div className="flex w-full flex-col gap-4">
			<div className="skeleton h-10 w-full" />
			<div className="skeleton h-10 w-full" />
			<div className="skeleton h-10 w-full" />
		</div>
	);
};
