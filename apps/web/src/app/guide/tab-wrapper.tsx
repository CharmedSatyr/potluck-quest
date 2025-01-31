import { JSX } from "react";

type Props = {
	bot: JSX.Element;
	web: JSX.Element;
};
const TabWrapper = ({ bot, web }: Props) => {
	const name = Math.random().toString();

	return (
		<div
			role="tablist"
			className="tabs tabs-bordered tabs-xs sm:tabs-sm md:tabs-md"
		>
			<input
				type="radio"
				name={name}
				role="tab"
				className="tab text-nowrap"
				aria-label="With PQ Bot on Discord"
				defaultChecked
			/>
			<div role="tabpanel" className="tab-content">
				{bot}
			</div>

			<input
				type="radio"
				name={name}
				role="tab"
				className="tab text-nowrap"
				aria-label="Standalone Web Interface"
			/>
			<div role="tabpanel" className="tab-content">
				{web}
			</div>
		</div>
	);
};

export default TabWrapper;
