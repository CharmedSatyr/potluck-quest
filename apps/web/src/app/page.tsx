import potluckQuest from "../../public/static/potluck-quest";
import Image from "next/image";
import Link from "next/link";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import OpenAiLogo from "~/components/branding/openai-white-logo";
import GotoEventForm from "~/components/goto-event-form";
import siteMetadata from "~/data/site-metadata";
import genPageMetadata from "~/seo";

export const metadata = genPageMetadata({ title: "Home" });

const CreateEventButton = () => (
	<Link href="/plan" className="btn btn-primary text-xl">
		Create an Event
	</Link>
);

const StartCta = () => {
	return (
		<div className="w-full xl:p-10">
			<div className="flex flex-col gap-2 text-center md:hidden">
				<CreateEventButton />

				<div className="divider-base divider">OR</div>

				<GotoEventForm />
			</div>

			<div className="hidden min-h-44 w-full md:flex">
				<div className="divider divider-start divider-horizontal w-1/2">
					<CreateEventButton />
				</div>
				<div className="divider divider-horizontal">OR</div>
				<div className="divider divider-end divider-horizontal w-1/2">
					<GotoEventForm />
				</div>
			</div>
		</div>
	);
};

const Home = () => {
	return (
		<main className="my-10 sm:mt-28 md:mx-10">
			<div className="hero border-base-300 bg-base-200 w-fit rounded-xl border py-10 shadow-xl xl:flex">
				<div className="hero-content rounded-xl text-center">
					<div className="flex-col xl:mx-10 xl:w-1/2">
						<h1 className="mb-0 text-4xl leading-tight font-bold sm:text-5xl">
							Gather your party, and roll for an epic meal.
						</h1>

						<p className="mb-0">
							<span className="text-primary-gradient">
								{siteMetadata.title}
							</span>{" "}
							combines powerful <DiscordLogo /> and <OpenAiLogo /> integrations
							to make it easier to plan events when everyone&apos;s invited to
							contribute a dish—from birthdays to holidays to game nights.{" "}
							<span className="text-info">In active development</span> by
							tabletop gamers who enjoy cooking and eating with their friends.
						</p>

						<p>
							Check out the <Link href="/guide">Guide</Link> to learn more, or
							get started below.
						</p>

						<div className="flex w-full justify-center xl:hidden">
							<Image
								alt={`${siteMetadata.title} logo`}
								blurDataURL={potluckQuest}
								className="max-w-sm rounded-lg shadow-2xl"
								placeholder="blur-sm"
								priority
								src="/static/potluck-quest.webp"
								width="250"
								height="250"
							/>
						</div>

						<StartCta />
					</div>

					<div className="hidden h-full w-1/2 items-center justify-center xl:flex">
						<div className="relative h-96 w-96">
							<Image
								alt={`${siteMetadata.title} logo`}
								className="m-0 rounded-lg shadow-2xl"
								src="/static/potluck-quest.png"
								fill
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
