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
import { DiscordIcon } from "~/components/icons/discord";
import UserAvatar from "~/components/user-avatar";
import siteMetadata from "~/data/site-metadata";

const LoggedOutContent = () => {
	return (
		<div className="navbar-end">
			<Form action={signInWithDiscordAndRevalidate}>
				<button className="btn btn-accent btn-sm" type="submit">
					Sign In <DiscordIcon height="16" width="16" />
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
					<details className="dropdown dropdown-end">
						<summary role="button" tabIndex={0}>
							<UserAvatar name={name} url={image} height={30} width={30} />
						</summary>
						<ul
							tabIndex={0}
							className="dropdown-content w-fit rounded-t-none bg-base-300"
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
		<div className="navbar border-b border-b-base-300 bg-base-200 shadow">
			<div className="navbar-start">
				<Link
					href="/"
					className="text-primary-gradient btn btn-ghost btn-sm text-lg"
				>
					{siteMetadata.title}
				</Link>
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
