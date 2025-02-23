import { PotluckQuest } from "./branding/potluck-quest-logo";
import {
	ArrowRightStartOnRectangleIcon,
	BookOpenIcon,
	Cog6ToothIcon,
	PencilSquareIcon,
	TableCellsIcon,
} from "@heroicons/react/24/outline";
import Form from "next/form";
import Link from "next/link";
import { PropsWithChildren } from "react";
import signInWithDiscordAndRevalidate from "~/actions/auth/sign-in-with-discord-and-revalidate";
import signOutAndRevalidate from "~/actions/auth/sign-out-and-revalidate";
import { auth } from "~/auth";
import { DiscordIcon } from "~/components/branding/discord-icon";
import UserAvatar from "~/components/user-avatar";

const LoggedOutContent = () => {
	return (
		<div className="navbar-end max-h-10 w-3/4">
			<ul className="menu menu-horizontal items-center">
				<li>
					<GuideLink />
				</li>
				<li className="hidden sm:inline-block">
					<CreateEventLink />
				</li>
			</ul>
			<Form action={signInWithDiscordAndRevalidate}>
				<button className="btn btn-sm btn-blurple text-nowrap" type="submit">
					<DiscordIcon className="size-4" /> Sign In
				</button>
			</Form>
		</div>
	);
};

const GuideLink = () => (
	<Link href="/guide" className="text-nowrap no-underline">
		<BookOpenIcon className="size-4" />
		Guide
	</Link>
);

const CreateEventLink = () => (
	<Link href="/plan" className="text-nowrap no-underline">
		<PencilSquareIcon className="size-4" />
		Create Event
	</Link>
);

const DashboardLink = () => (
	<Link href="/dashboard" className="text-nowrap no-underline">
		<TableCellsIcon className="size-4" />
		Dashboard
	</Link>
);

const SettingsLink = () => (
	<Link href="/settings" className="text-nowrap no-underline">
		<Cog6ToothIcon className="size-4" />
		Settings
	</Link>
);

const Signout = () => (
	<a className="text-nowrap no-underline">
		<Form action={signOutAndRevalidate}>
			<button type="submit">
				<ArrowRightStartOnRectangleIcon className="inline size-4" /> Sign Out
			</button>
		</Form>
	</a>
);

const LoggedInContent = ({ image, name }: { image: string; name: string }) => {
	return (
		<div className="navbar-end max-h-10 w-3/4">
			<ul className="menu menu-horizontal items-center">
				<li className="hidden lg:inline-block">
					<GuideLink />
				</li>
				<li className="hidden lg:inline-block">
					<CreateEventLink />
				</li>
				<li className="hidden lg:inline-block">
					<DashboardLink />
				</li>
				<li className="hidden text-sm sm:inline-flex">Welcome, {name}</li>

				<li>
					{/* Having dropdown class here breaks it in v5 for some reason. */}
					<details className="dropdown-end">
						<summary className="not-prose" role="button" tabIndex={0}>
							<UserAvatar name={name} url={image} height={30} width={30} />
						</summary>
						<ul
							tabIndex={0}
							className="dropdown-content bg-base-300 w-fit rounded-t-none"
						>
							<li className="lg:hidden">
								<GuideLink />
							</li>

							<li className="lg:hidden">
								<CreateEventLink />
							</li>

							<li className="lg:hidden">
								<DashboardLink />
							</li>

							<li>
								<SettingsLink />
							</li>

							<li>
								<Signout />
							</li>
						</ul>
					</details>
				</li>
			</ul>
		</div>
	);
};

const Nav = ({ children }: PropsWithChildren) => {
	return (
		<div className="navbar border-b-base-300 bg-base-200 border-b shadow-sm">
			<div className="navbar-start ml-2 text-lg">
				<PotluckQuest />
			</div>

			{children}
		</div>
	);
};

const NavBar = async () => {
	const session = await auth();

	if (!session?.user?.image || !session.user.name) {
		return (
			<Nav>
				<LoggedOutContent />
			</Nav>
		);
	}

	return (
		<Nav>
			<LoggedInContent image={session.user.image} name={session.user.name} />
		</Nav>
	);
};

export default NavBar;
