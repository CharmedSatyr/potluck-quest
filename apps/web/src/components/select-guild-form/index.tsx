"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import GuildIcon from "~/components/guild-icon";
import { BOT_INSTALL_LINK } from "~/constants/bot-install-link";
import { NO_GUILD_ID } from "~/constants/no-guild-id";

type Props = {
	userDiscordGuildsPromise: Promise<
		{
			guildId?: string;
			name: string;
			iconUrl?: string;
		}[]
	>;
};

const GuildOption = ({
	guildId,
	iconUrl,
	name,
}: {
	guildId?: string;
	iconUrl?: string;
	name: string;
}) => {
	return (
		<div className="flex items-center">
			<label className="label flex cursor-pointer items-center gap-2">
				<input
					type="radio"
					name="guild-option"
					className="radio checked:bg-primary"
					value={guildId ?? NO_GUILD_ID}
					defaultChecked={!guildId}
				/>
				{iconUrl && <GuildIcon name={name} url={iconUrl} />}
				<span className="label-text">{name}</span>
			</label>
		</div>
	);
};

const getSearchParamsObject = (
	search: URLSearchParams
): Record<string, string> => {
	const paramsObject: Record<string, string> = {};

	for (const [key, value] of search) {
		paramsObject[key] = value;
	}

	return paramsObject;
};

const SelectGuildForm = ({ userDiscordGuildsPromise }: Props) => {
	const userDiscordGuilds = use(userDiscordGuildsPromise);

	const search = useSearchParams();

	return (
		<Form action="/plan/confirm" className="h-full w-full">
			<h1 className="text-primary-gradient flex items-center gap-2">
				Select a Server
			</h1>

			<section className="rounded-xl bg-base-300 px-6 pb-6 pt-1 shadow-xl">
				<p>
					Do you want to create an event in a{" "}
					<Image
						src="/static/discord-logo-blue.png"
						alt=""
						height="19"
						width="100"
						className="m-0 inline"
					/>{" "}
					server that stays in sync with this one?{" "}
					<Link href="/guide#creating-an-event">Read more.</Link>
				</p>
				<div className="rounded-xl border border-info px-2">
					<p className="mb-0 flex items-center gap-1">
						<InformationCircleIcon
							height={25}
							width={25}
							className="inline text-info"
						/>{" "}
						For a server to be eligible:
					</p>
					<ul className="mt-0">
						<li>You must have permission to manage events in that server.</li>
						<li>
							The server must have{" "}
							<Link
								href={BOT_INSTALL_LINK}
								rel="noopener noreferrer"
								target="_blank"
							>
								Potluck Quest Bot
							</Link>{" "}
							installed.
						</li>
					</ul>
				</div>

				<h3>Available Servers</h3>
				<div className="form-control">
					{[
						{
							name: "None",
						},
						...userDiscordGuilds,
					].map((guild) => (
						<GuildOption
							key={guild.name.concat(guild.guildId ?? "")}
							{...guild}
						/>
					))}
				</div>
			</section>

			{Object.entries(getSearchParamsObject(search))
				.filter(([, value]) => value !== "")
				.map(([key, value]) => (
					<input
						key={key}
						hidden
						name={key}
						readOnly
						type="text"
						value={value}
					/>
				))}

			<div className="mt-2 flex justify-end">
				<button className="btn btn-primary btn-sm" type="submit">
					Save and Continue
				</button>
			</div>
		</Form>
	);
};

export default SelectGuildForm;
