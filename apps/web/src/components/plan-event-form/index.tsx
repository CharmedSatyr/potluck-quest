"use client";

import { DESCRIPTION_LENGTH } from "@potluck/utilities/constants";
import Form from "next/form";
import Image from "next/image";
import { usePathname } from "next/navigation";
import discordLogoWhite from "public/static/discord-logo-white.png";
import { use, useActionState, useEffect, useRef } from "react";
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

	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
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
			className="fieldset"
			name="create-event-form"
		>
			<div className="mb-2">
				<label className="fieldset-label" htmlFor="name-input">
					Event Title
				</label>
				<input
					className="input validator w-full"
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
					<label className="fieldset-label" htmlFor="date-input">
						Date
					</label>
					<input
						className="input validator w-full"
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
					<label
						className="fieldset-label flex justify-between"
						htmlFor="time-input"
					>
						Time{" "}
						<small>
							<span className="hidden xl:block">
								{timezone} ({offsetNameShort})
							</span>
							<span className="xl:hidden">{offsetNameShort}</span>
						</small>
					</label>
					<input
						className="input validator w-full"
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
				<label className="fieldset-label" htmlFor="location-input">
					Location
				</label>
				<input
					className="input validator w-full"
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
				<label className="fieldset-label" htmlFor="hosts-input">
					Hosts
				</label>
				<div className="input flex w-full items-center gap-2">
					<span className="badge badge-info badge-xs md:badge-sm gap-2">
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
				<label className="fieldset-label" htmlFor="description-input">
					Description
				</label>
				<div className="input flex w-full items-center gap-2">
					<span className="badge badge-info badge-xs md:badge-sm gap-2">
						Optional
					</span>
					<textarea
						className="w-full"
						defaultValue={eventInput.description}
						enterKeyHint="next"
						id="description-input"
						maxLength={DESCRIPTION_LENGTH}
						name="description"
						placeholder="Additional info or vibe text"
						ref={descriptionRef}
					/>
				</div>
			</div>

			<div className="mt-2 w-full">
				{loggedIn && (
					<button
						className="btn btn-primary btn-sm float-right w-full md:w-fit"
						type="submit"
					>
						{isPending && <LoadingIndicator size={10} />}
						{!isPending && "Continue"}
					</button>
				)}
				{!loggedIn && !isPending && (
					<button className="btn btn-blurple btn-sm float-right w-full md:w-fit">
						Continue with{" "}
						<Image
							alt="Discord logo"
							className="m-0"
							src={discordLogoWhite}
							width="80"
						/>
					</button>
				)}
			</div>
		</Form>
	);
};

export default PlanEventForm;

export const PlanEventFormFallback = () => {
	return (
		<div className="fieldset">
			<div className="mb-2">
				<label className="fieldset-label">Event Title</label>
				<div className="skeleton h-10 w-full" />
			</div>

			<div className="my-2 flex justify-between">
				<div className="w-5/12">
					<label className="fieldset-label">Date</label>
					<div className="skeleton h-10 w-full" />
				</div>

				<div className="w-5/12">
					<label className="fieldset-label">Time</label>
					<div className="skeleton h-10 w-full" />
				</div>
			</div>

			<div className="my-2">
				<label className="fieldset-label">Location</label>
				<div className="skeleton h-10 w-full" />
			</div>

			<div className="my-2">
				<label className="fieldset-label">Hosts</label>
				<div className="skeleton h-10 w-full" />
			</div>

			<div className="my-2">
				<label className="fieldset-label">Description</label>
				<div className="skeleton h-10 w-full" />
			</div>

			<div className="mt-2 w-full">
				<button className="btn btn-disabled btn-primary btn-sm float-right w-full md:w-fit">
					Continue
				</button>
			</div>
		</div>
	);
};
