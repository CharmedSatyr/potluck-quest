import TabWrapper from "./tab-wrapper";
import Link from "next/link";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import { PotluckQuest } from "~/components/branding/potluck-quest-logo";
import { PQBot } from "~/components/branding/pq-bot-logo";

const BotUseCases = () => (
	<>
		<span>
			<PQBot /> is a <DiscordLogo /> bot that manages potlucks directly in your
			server. It is perfect if your group:
		</span>
		<ul>
			<li>
				Has a{" "}
				<span className="font-bold">
					dedicated <DiscordLogo /> server
				</span>{" "}
				(e.g., gaming groups, hobby clubs, student organizations).
			</li>
			<li>
				Meets <span className="font-bold">in person sometimes</span> but
				coordinates online.
			</li>
			<li>
				Wants members to be able to{" "}
				<span className="font-bold">
					sign up for events and dishes without ever leaving <DiscordLogo />
				</span>
				.
			</li>
		</ul>
	</>
);

const WebUseCases = () => (
	<p>
		If your group{" "}
		<span className="font-bold">
			doesn&apos;t have a dedicated <DiscordLogo /> server
		</span>
		, or server admins prefer not to install <PQBot />, the <PotluckQuest /> web
		interface offers{" "}
		<span className="font-bold">the full set of planning tools</span> without
		requiring bot integration.
	</p>
);

const UseCases = () => (
	<section>
		<p>
			<PotluckQuest /> is designed for potluck-style gatherings where guests can
			sign up to bring dishes or other items.{" "}
			<span className="font-bold">
				All users login with <DiscordLogo />
			</span>
			, so it works best for groups that already use <DiscordLogo /> to
			communicate.
		</p>

		<p>
			You can use <PotluckQuest /> through this website or by adding <PQBot />{" "}
			to your <DiscordLogo /> server.
		</p>

		<TabWrapper bot={<BotUseCases />} web={<WebUseCases />} />

		<p>
			See <Link href="#getting-started">Getting Started</Link> for step-by-step
			instructions.
		</p>

		<h3>Great For...</h3>
		<ul>
			<li>
				<span className="font-bold">Tabletop gaming groups</span> (D&D nights,
				board game meetups)
			</li>
			<li>
				<span className="font-bold">Study groups</span> (snack breaks during
				cram sessions)
			</li>
			<li>
				<span className="font-bold">Hobby & fan clubs</span> (anime nights,
				cosplay meetups)
			</li>
			<li>
				<span className="font-bold">Book clubs</span> (discuss literature over a
				shared meal)
			</li>
			<li>
				<span className="font-bold">Sports teams</span> (post-game potlucks and
				team dinners)
			</li>
			<li>
				<span className="font-bold">Writing circles</span> (author meetups and
				critique sessions)
			</li>
			<li>
				<span className="font-bold">Student organizations</span> (campus events,
				club gatherings)
			</li>
			<li>
				<span className="font-bold">Co-working groups</span> (office potlucks
				and networking socials)
			</li>
			<li>
				<span className="font-bold">Fitness and training groups</span> (meal
				prep coordination, post-workout meals)
			</li>
			<li>
				<span className="font-bold">Emergency and mutual aid groups</span> (meal
				trains, food drives)
			</li>
			<li>
				<span className="font-bold">Casual friend gatherings</span> (BBQs, house
				parties, watch parties)
			</li>
		</ul>
		<p>
			No matter the occasion, <PotluckQuest /> keeps your potlucks organized and
			hassle-free.
		</p>
	</section>
);

export default UseCases;
