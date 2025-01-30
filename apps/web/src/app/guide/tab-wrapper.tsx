import { JSX } from "react";

type Props = {
	bot: JSX.Element;
	botHeading?: string;
	web: JSX.Element;
	webHeading?: string;
};
const TabWrapper = ({ bot, botHeading, web, webHeading }: Props) => {
	const name = Math.random().toString();

	return (
		<div role="tablist" className="tabs tabs-bordered">
			<input
				type="radio"
				name={name}
				role="tab"
				className="tab text-nowrap"
				aria-label={botHeading ?? "With PQ Bot on Discord"}
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
				aria-label={webHeading ?? "Standalone Web Interface"}
			/>
			<div role="tabpanel" className="tab-content">
				{web}
			</div>
		</div>
	);
};

export default TabWrapper;
