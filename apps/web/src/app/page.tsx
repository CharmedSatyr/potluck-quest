import Image from "next/image";
import Link from "next/link";
import potluckQuest from "public/static/potluck-quest.webp";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import OpenAiLogo from "~/components/branding/openai-white-logo";
import { PotluckQuest } from "~/components/branding/potluck-quest-logo";
import StartCta from "~/components/start-cta";
import siteMetadata from "~/data/site-metadata";
import genPageMetadata from "~/seo";

export const metadata = genPageMetadata({ title: "Home" });

const Home = () => {
	return (
		<main className="my-10 sm:mt-28 md:mx-10">
			<div className="hero border-base-300 bg-base-200 rounded-xl px-8 py-10 shadow-xl sm:px-8 xl:flex xl:px-0">
				<div className="hero-content">
					<div className="flex-col text-center xl:w-1/2">
						<h1 className="mb-0 text-4xl font-bold xl:text-5xl">
							Gather your party, and roll for an epic meal.
						</h1>

						<p>
							<PotluckQuest /> combines powerful <DiscordLogo /> and{" "}
							<OpenAiLogo /> integrations to make it easier to plan events when
							everyone&apos;s invited to contribute a dish—from game nights to
							watch parties to hobby meetups.{" "}
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
								className="rounded-lg"
								placeholder="blur"
								priority
								src={potluckQuest}
								width={300}
							/>
						</div>

						<StartCta />
					</div>

					<div className="hidden h-full w-5/12 items-center justify-center xl:flex">
						<Image
							alt={`${siteMetadata.title} logo`}
							className="rounded-xl"
							placeholder="blur"
							priority
							src={potluckQuest}
							width={400}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
