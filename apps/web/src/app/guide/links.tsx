import Link from "next/link";

export const Command = ({
	command,
}: {
	command: "plan" | "view" | "slots";
}) => (
	<Link href={`#${command}-command`}>
		<code>/{command}</code>
	</Link>
);

export const Events = () => <Link href="#events">events</Link>;
export const SignupSlots = () => <Link href="#slots">signup slots</Link>;
