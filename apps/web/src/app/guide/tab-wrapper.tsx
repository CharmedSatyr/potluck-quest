import { JSX } from "react";

type Props = {
	bot: JSX.Element;
	web: JSX.Element;
};
const TabWrapper = ({ bot, web }: Props) => {
	const name = Math.random().toString();

	return (
		<div role="tablist" className="tabs tabs-border tabs-xs sm:tabs-md">
			<input
				type="radio"
				name={name}
				role="tab"
				className="tab text-nowrap"
				aria-label="Standalone Web Interface"
				defaultChecked
			/>
			<div
				role="tabpanel"
				className="tab-content border-base-300 bg-base-100 rounded-xl p-4"
			>
				{web}
			</div>

			<input
				type="radio"
				name={name}
				role="tab"
				className="tab text-nowrap"
				aria-label="PQ Bot on Discord"
			/>
			<div
				role="tabpanel"
				className="tab-content border-base-300 bg-base-100 rounded-xl p-4"
			>
				{bot}
			</div>
		</div>
	);
};

export default TabWrapper;
