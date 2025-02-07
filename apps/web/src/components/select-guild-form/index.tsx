"use client";

import DiscordLogo from "../logos/discord-blurple-logo";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import GuildIcon from "~/components/guild-icon";
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
		<Form action="/plan/confirm" className="flex flex-col items-center">
			<p className="mt-0">
				Do you want to create an event in a <DiscordLogo /> server that stays in
				sync with this one?
			</p>
			<p className="mt-0">
				<InformationCircleIcon className="inline size-5 text-info" />{" "}
				<Link href="/guide#creating-an-event">Read more</Link> about what this
				means and how to make your servers show up below.
			</p>

			<section className="border-bg-300 w-full rounded-xl bg-base-200 p-4 shadow md:w-3/4">
				<h3 className="mb-4 mt-0">Available Servers</h3>
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

			<div className="my-6 flex w-full justify-end">
				<button
					className="btn btn-primary btn-sm w-full md:w-fit"
					type="submit"
				>
					Save and Continue
				</button>
			</div>
		</Form>
	);
};

export default SelectGuildForm;
