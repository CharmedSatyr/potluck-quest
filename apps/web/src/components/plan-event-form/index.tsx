"use client";

import { DESCRIPTION_LENGTH } from "@potluck/shared/constants";
import Form from "next/form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useActionState, useEffect, useRef } from "react";
import { DiscordIcon } from "~/components/icons/discord";
import LoadingIndicator from "~/components/loading-indicator";
import { Step } from "~/components/manage-event-wizard";
import { loginAction } from "~/components/plan-event-form/login-action";
import useTimezone from "~/hooks/use-timezone";
import { oneYearFromToday, today } from "~/utilities/date";
import enterToNextRef from "~/utilities/enter-to-next-ref";

type Props = {
	code: string | null;
	eventInputPromise: Promise<EventInput>;
	loggedIn: boolean;
	mode: WizardMode;
};

const PlanEventForm = ({ code, eventInputPromise, loggedIn, mode }: Props) => {
	const eventInput = use(eventInputPromise);
	const pathname = usePathname();
	const [, login, isPending] = useActionState(loginAction, { path: pathname });

	const descriptionRef = useRef<HTMLInputElement | null>(null);
	const hostsRef = useRef<HTMLInputElement | null>(null);
	const locationRef = useRef<HTMLInputElement | null>(null);
	const startDateRef = useRef<HTMLInputElement | null>(null);
	const startTimeRef = useRef<HTMLInputElement | null>(null);
	const titleRef = useRef<HTMLInputElement | null>(null);

	const { timezone, offsetNameShort } = useTimezone();

	useEffect(() => {
		titleRef.current?.focus();
	}, []);

	const determineAction = () => {
		if (mode === "create") {
			return loggedIn ? `/plan#${Step.PLAN_FOOD}` : login;
		}

		if (mode === "edit") {
			return `/event/${code}/edit#${Step.PLAN_FOOD}`;
		}

		return "";
	};

	return (
		<Form
			action={determineAction()}
			className="form-control w-11/12"
			name="create-event-form"
		>
			{mode === "create" && (
				<h1 className="text-primary-gradient mb-4">Create an Event</h1>
			)}

			{mode === "edit" && (
				<h1 className="text-primary-gradient mb-4 flex items-center">
					Now Editing
					<Link
						href={`/event/${code}`}
						className="btn btn-secondary btn-sm ml-2 text-xl"
					>
						{code}
					</Link>
				</h1>
			)}

			<div>
				<label className="label label-text" htmlFor="name-input">
					Event Title
				</label>
				<input
					className="input input-bordered w-full text-sm md:text-base"
					defaultValue={eventInput.title}
					enterKeyHint="next"
					id="name-input"
					maxLength={100}
					name="title"
					onKeyDown={(e) => enterToNextRef(e, startDateRef)}
					placeholder="What's this adventure?"
					ref={titleRef}
					required
					type="search"
				/>
			</div>

			<div className="my-2 flex justify-between">
				<div className="w-5/12">
					<label className="label label-text" htmlFor="date-input">
						Date
					</label>
					<input
						className="input input-bordered w-full text-sm md:text-base"
						data-testid="start-date"
						defaultValue={eventInput.startDate}
						enterKeyHint="next"
						max={oneYearFromToday}
						min={today}
						name="startDate"
						onKeyDown={(e) => enterToNextRef(e, startTimeRef)}
						ref={startDateRef}
						id="date-input"
						required
						type="date"
					/>
				</div>

				<div className="w-5/12">
					<label className="label label-text text-sm" htmlFor="time-input">
						Time{" "}
						<small>
							{timezone} ({offsetNameShort})
						</small>
					</label>
					<input
						className="input input-bordered w-full text-sm md:text-base"
						data-testid="start-time"
						defaultValue={eventInput.startTime}
						enterKeyHint="next"
						id="time-input"
						name="startTime"
						onKeyDown={(e) => enterToNextRef(e, locationRef)}
						ref={startTimeRef}
						required
						step={60}
						type="time"
					/>
				</div>

				<input hidden readOnly type="text" value={timezone} />
			</div>

			<div className="my-2">
				<label className="label label-text" htmlFor="location-input">
					Location
				</label>
				<input
					className="input input-bordered w-full text-sm md:text-base"
					defaultValue={eventInput.location}
					enterKeyHint="next"
					id="location-input"
					maxLength={100}
					name="location"
					onKeyDown={(e) => enterToNextRef(e, hostsRef)}
					placeholder="Place name, address, or link"
					ref={locationRef}
					required
					type="search"
				/>
			</div>

			<div className="my-2">
				<label className="label label-text" htmlFor="hosts-input">
					Hosts
				</label>
				<div className="input input-bordered flex w-full items-center gap-2 text-sm md:text-base">
					<span className="badge badge-info badge-sm gap-2 md:badge-md">
						Optional
					</span>
					<input
						className="w-full"
						defaultValue={eventInput.hosts}
						enterKeyHint="next"
						id="hosts-input"
						maxLength={100}
						name="hosts"
						onKeyDown={(e) => enterToNextRef(e, descriptionRef)}
						ref={hostsRef}
						placeholder="Discord username if blank"
						type="search"
					/>
				</div>
			</div>

			<div className="my-2">
				<label className="label label-text" htmlFor="description-input">
					Description
				</label>
				<div className="input input-bordered flex w-full items-center gap-2 text-sm md:text-base">
					<span className="badge badge-info badge-sm gap-2 md:badge-md">
						Optional
					</span>
					<input
						className="w-full"
						defaultValue={eventInput.description}
						enterKeyHint="next"
						id="description-input"
						maxLength={DESCRIPTION_LENGTH}
						name="description"
						placeholder="Additional info or vibe text"
						ref={descriptionRef}
						type="search"
					/>
				</div>
			</div>

			<button className="btn btn-primary my-6 w-full" type="submit">
				{isPending && <LoadingIndicator size={10} />}
				{loggedIn && !isPending && "Next"}
				{!loggedIn && !isPending && (
					<>
						Continue with Discord <DiscordIcon className="size-4" />
					</>
				)}
			</button>
		</Form>
	);
};

export default PlanEventForm;

export const PlanEventFormFallback = () => {
	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex justify-around gap-2">
				<div className="skeleton h-16 w-full" />
			</div>
			<div className="flex justify-around gap-2">
				<div className="skeleton h-14 w-full" />
			</div>
			<div className="flex justify-between gap-2">
				<div className="skeleton h-14 w-5/12" />
				<div className="skeleton h-14 w-5/12" />
			</div>
			<div className="flex justify-around gap-2">
				<div className="skeleton h-14 w-full" />
			</div>
			<div className="flex justify-around gap-2">
				<div className="skeleton h-14 w-full" />
			</div>
			<div className="flex justify-around gap-2">
				<div className="skeleton h-14 w-full" />
			</div>
			<div className="flex justify-around gap-2">
				<div className="skeleton h-14 w-full" />
			</div>
		</div>
	);
};
