import TabWrapper from "./tab-wrapper";
import DiscordLogo from "~/components/branding/discord-blurple-logo";
import OpenAiLogo from "~/components/branding/openai-white-logo";
import { PotluckQuest } from "~/components/branding/potluck-quest-logo";
import { PQBot } from "~/components/branding/pq-bot-logo";

const BotUseCases = () => (
	<>
		<span>
			<PQBot /> is a <DiscordLogo /> bot that manages potlucks directly in your
			server. Made for merry folk who:
		</span>
		<ul>
			<li>
				Have a{" "}
				<span className="font-bold">
					dedicated <DiscordLogo /> server
				</span>{" "}
				(e.g., gaming groups, hobby clubs, student organizations).
			</li>
			<li>
				Meet <span className="font-bold">in person sometimes</span> and
				coordinate online.
			</li>
			<li>
				Want members to be able to{" "}
				<span className="font-bold">
					sign up for events and dishes without leaving <DiscordLogo />
				</span>
				.
			</li>
		</ul>
	</>
);

const WebUseCases = () => (
	<>
		<span>
			The <PotluckQuest /> web interface offers{" "}
			<span className="font-bold">the full set of potluck planning tools</span>{" "}
			without requiring bot integration. A grand choice if your lot:
		</span>
		<ul>
			<li>
				<span className="font-bold">Meets in person sometimes</span> and
				coordinates online.
			</li>
			<li>
				Has members who have <DiscordLogo /> accounts but{" "}
				<span className="font-bold">
					aren&apos;t members of a dedicated server
				</span>
				.
			</li>
		</ul>
	</>
);

const Introduction = () => (
	<section>
		<p>
			<PotluckQuest /> and its <OpenAiLogo />
			-assisted tools make shared meal planning simple and collaborative.
		</p>
		<p>
			<PotluckQuest /> is designed for potluck-style gatherings where guests can
			sign up to bring dishes or other items.{" "}
			<span className="font-bold">
				All users login with <DiscordLogo />
			</span>
			, so it&apos;s well-suited for groups that already chat there.
		</p>

		<p>
			You can use <PotluckQuest /> through this website or by adding <PQBot />{" "}
			to your <DiscordLogo /> server.
		</p>

		<TabWrapper bot={<BotUseCases />} web={<WebUseCases />} />

		<h3>Just the Thing For...</h3>
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
	</section>
);

export default Introduction;
