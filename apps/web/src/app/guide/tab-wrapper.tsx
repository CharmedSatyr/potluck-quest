import { JSX } from "react";

type Props = {
	bot: JSX.Element;
	botHeading: string;
	web: JSX.Element;
	webHeading: string;
};
const TabWrapper = ({ bot, botHeading, web, webHeading }: Props) => (
	<div role="tablist" className="tabs tabs-bordered">
		<input
			type="radio"
			name="my_tabs_1"
			role="tab"
			className="tab text-nowrap"
			aria-label={botHeading}
			defaultChecked
		/>
		<div role="tabpanel" className="tab-content">
			{bot}
		</div>

		<input
			type="radio"
			name="my_tabs_1"
			role="tab"
			className="tab text-nowrap"
			aria-label={webHeading}
		/>
		<div role="tabpanel" className="tab-content">
			{web}
		</div>
	</div>
);

export default TabWrapper;
