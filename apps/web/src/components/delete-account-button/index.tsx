"use client";

import { FireIcon } from "@heroicons/react/24/solid";
import { POTLUCK_QUEST_DISCORD_INVITE_LINK } from "@potluck/utilities/constants";
import Form from "next/form";
import Image from "next/image";
import discordLogoBlue from "public/static/discord-logo-blue.png";
import { useActionState, useRef } from "react";
import deleteAccountAction from "~/components/delete-account-button/delete-account-action";
import { DeleteAccountState } from "~/components/delete-account-button/delete-account-action.types";
import ExternalLink from "~/components/external-link";
import LoadingIndicator from "~/components/loading-indicator";
import WarningAlert from "~/components/warning-alert";

type Props = {
	className?: string;
};

const DeleteAccountForm = ({ className }: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const [state, submit, isPending] = useActionState<
		DeleteAccountState,
		FormData
	>(deleteAccountAction, { error: false });

	return (
		<Form action={submit}>
			<button
				className={`btn btn-error btn-sm w-full ${className}`}
				disabled={dialogRef.current?.open}
				type="button"
				onClick={() => dialogRef.current?.showModal()}
			>
				{isPending ? <LoadingIndicator size={8} /> : "Delete My Account"}
			</button>
			<dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h1>Let&apos;s Not Be Hasty!</h1>
					<p>
						Are you sure you want to depart our little gathering? This choice,
						once made, cannot be unmade.
					</p>
					<p>
						The feasts you&apos;ve hosted, dishes you&apos;ve pledged, and
						invitations you&apos;ve answered will pass into legend.
					</p>
					<p>
						Think well on this, friend, and should you have words of wisdom (or
						simply a good tale to tell),{" "}
						<ExternalLink
							className="link link-hover"
							href={POTLUCK_QUEST_DISCORD_INVITE_LINK}
						>
							seek us out on{" "}
							<Image
								alt="Discord logo"
								className="not-prose m-0 inline hover:scale-105"
								src={discordLogoBlue}
								width={80}
							/>
						</ExternalLink>
						—we&apos;ll have the kettle on.
					</p>

					{state.error && (
						<WarningAlert text="There was a problem. Please try again." />
					)}

					<div className="modal-action">
						<button
							aria-label="Cancel"
							className="btn btn-sm"
							disabled={isPending}
							type="button"
							onClick={() => dialogRef.current?.close()}
						>
							Reconsider
						</button>
						<button
							aria-label="Delete My Account"
							className="btn btn-error btn-sm"
							disabled={isPending}
							type="submit"
						>
							{isPending ? (
								<LoadingIndicator size={8} />
							) : (
								<>
									<FireIcon className="size-4" /> Poof! Gone.
								</>
							)}
						</button>
					</div>
				</div>
			</dialog>
		</Form>
	);
};

export default DeleteAccountForm;
