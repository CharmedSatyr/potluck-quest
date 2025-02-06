import Link from "next/link";
import { Suspense } from "react";
import findEventsByUser from "~/actions/event/find-events-by-user";
import findEventsByUserWithRsvp from "~/actions/event/find-events-by-user-with-rsvp";
import DateCellContents from "~/app/dashboard/date-cell-contents";
import { TableFallback } from "~/app/dashboard/table-fallback";
import { auth } from "~/auth";
import DeleteEventForm from "~/components/delete-event-button";
import SlideIn from "~/components/slide-in";
import genPageMetadata from "~/seo";
import eventIsPassed from "~/utilities/event-is-passed";

export const metadata = genPageMetadata({ title: "Dashboard" });

const EventCodeButton = ({
	code,
	passed,
}: {
	code: string;
	passed: boolean;
}) => (
	<Link
		className={`btn btn-sm font-bold ${passed ? "btn-ghost btn-outline" : "btn-success"}`}
		href={`/event/${code}`}
	>
		{code}
	</Link>
);

const HostingTable = async () => {
	const session = await auth();
	const hosted = await findEventsByUser({ createdBy: session!.user!.id! });

	if (!hosted?.length) {
		return (
			<div>
				You haven&apos;t hosted any events.{" "}
				<Link href="/plan">Go throw a party!</Link>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-base-300 shadow">
			<table className="table table-pin-rows table-sm my-0">
				<thead>
					<tr className="">
						<th>Code</th>
						<th>Name</th>
						<th>Date</th>
						<th className="hidden md:table-cell">Location</th>
						<th className="hidden md:table-cell"></th>
					</tr>
				</thead>
				<tbody>
					{hosted.map((event) => {
						const passed = eventIsPassed(event.startUtcMs);

						return (
							<tr
								key={event.id}
								className={passed ? "bg-base-300" : "bg-base-100"}
							>
								<td>
									<EventCodeButton code={event.code} passed={passed} />
								</td>
								<td>{event.title}</td>
								<td>
									<DateCellContents startUtcMs={event.startUtcMs} />
								</td>
								<td className="hidden md:table-cell">{event.location}</td>
								<td className="hidden md:table-cell">
									<DeleteEventForm
										className="btn-sm float-right max-w-20"
										code={event.code}
										redirect={false}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const AttendingTable = async () => {
	const session = await auth();
	const rsvps = await findEventsByUserWithRsvp({ id: session!.user!.id! });

	if (!rsvps?.length) {
		return (
			<div>
				You haven&apos;t attended any events.{" "}
				<Link href="/plan">Go throw a party!</Link>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-base-300 shadow">
			<table className="table table-pin-rows table-sm my-0">
				<thead>
					<tr className="">
						<th>Code</th>
						<th>Name</th>
						<th>Date</th>
						<th className="hidden md:table-cell">Location</th>
					</tr>
				</thead>
				<tbody>
					{rsvps.map((event) => {
						const passed = eventIsPassed(event.startUtcMs);

						return (
							<tr
								key={event.code}
								className={passed ? "bg-base-300" : "bg-base-100"}
							>
								<td>
									<EventCodeButton code={event.code} passed={passed} />
								</td>
								<td>{event.title}</td>
								<td>
									<DateCellContents startUtcMs={event.startUtcMs} />
								</td>
								<td className="hidden md:table-cell">{event.location}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const DashboardPage = async () => {
	return (
		<main className="contrast-container">
			<h1 className="text-primary-gradient">Dashboard</h1>

			<SlideIn>
				<h2>Hosting</h2>
				<Suspense fallback={<TableFallback />}>
					<HostingTable />
				</Suspense>
			</SlideIn>

			<SlideIn>
				<h2>Attending</h2>
				<Suspense fallback={<TableFallback />}>
					<AttendingTable />
				</Suspense>
			</SlideIn>
		</main>
	);
};

export default DashboardPage;
