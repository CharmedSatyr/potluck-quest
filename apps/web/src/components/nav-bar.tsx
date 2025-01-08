import {
	ArrowRightStartOnRectangleIcon,
	Cog6ToothIcon,
	PencilSquareIcon,
	TableCellsIcon,
} from "@heroicons/react/24/outline";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import signInWithDiscordAndRevalidate from "~/actions/auth/sign-in-with-discord-and-revalidate";
import signOutAndRevalidate from "~/actions/auth/sign-out-and-revalidate";
import { auth } from "~/auth";
import { DiscordIcon } from "~/components/icons/discord";
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
	<Form action={signOutAndRevalidate} className="w-full">
		<button className="m-0 w-full min-w-28 p-0" type="submit">
			<a className="w-full no-underline">
				<ArrowRightStartOnRectangleIcon className="-ml-8 mr-1 inline-block size-5" />{" "}
				Sign Out
			</a>
		</button>
	</Form>
);

const LoggedInContent = ({ image, name }: { image: string; name: string }) => {
	return (
		<div className="navbar-end w-3/4">
			<ul className="menu menu-horizontal items-center">
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
							<div className="w-10 rounded-full border">
								<Image
									width={64}
									height={64}
									className="m-0 rounded-full p-0"
									src={image}
									alt={`${name}'s Avatar`}
									priority
								/>
							</div>
						</summary>
						<ul
							tabIndex={0}
							className="dropdown-content w-fit rounded-t-none bg-base-300"
						>
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
		<div className="navbar max-h-16 bg-base-100/30">
			<div className="navbar-start">
				<Link href="/" className="btn btn-ghost btn-sm text-xl">
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