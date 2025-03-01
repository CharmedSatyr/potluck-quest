"use client";

import OverlappingAvatars from "../overlapping-avatars";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { PropsWithChildren, useState } from "react";

type Props = {
	item: string;
	requestedCount: number;
	totalCommitments: number;
	users: {
		id: string;
		image: string | null;
		name: string | null;
		commitments: number;
	}[];
};

const SlotContainer = ({
	children,
	item,
	requestedCount,
	totalCommitments,
	users,
}: PropsWithChildren<Props>) => {
	const [expanded, setExpanded] = useState<boolean>(false);

	return (
		<section className="collapse w-full">
			<input
				aria-label="expand-slot-container"
				type="checkbox"
				checked={expanded}
				onChange={() => setExpanded(!expanded)}
				id={`expand-slot-checkbox-${item}`}
			/>

			<div className="collapse-title flex w-full items-center justify-between py-0">
				<div className="text-sm md:w-6/12">{item}</div>

				<div className="hidden sm:flex sm:gap-4">
					<OverlappingAvatars users={users} />
				</div>

				<div className="flex items-center justify-between text-right text-sm">
					{totalCommitments} of {requestedCount} filled
					{expanded ? (
						<ChevronUpIcon className="-mr-6 ml-2 size-4" />
					) : (
						<ChevronDownIcon className="-mr-6 ml-2 size-4" />
					)}
				</div>
			</div>
			<div className="collapse-content">{children}</div>
		</section>
	);
};

export default SlotContainer;
