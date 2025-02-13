import { JSX } from "react";

type Props = {
	bot: JSX.Element;
	web: JSX.Element;
};
const TabWrapper = ({ bot, web }: Props) => {
	const name = Math.random().toString();

	return (
		<div role="tablist" className="tabs tabs-border">
			<input
				type="radio"
				name={name}
				role="tab"
				className="tab text-nowrap"
				aria-label="With PQ Bot on Discord"
				defaultChecked
			/>
			<div
				role="tabpanel"
				className="tab-content border-base-300 bg-base-100 rounded-xl p-4"
			>
				{bot}
			</div>

			<input
				type="radio"
				name={name}
				role="tab"
				className="tab text-nowrap"
				aria-label="Standalone Web Interface"
			/>
			<div
				role="tabpanel"
				className="tab-content border-base-300 bg-base-100 rounded-xl p-4"
			>
				{web}
			</div>
		</div>
	);
};

export default TabWrapper;
