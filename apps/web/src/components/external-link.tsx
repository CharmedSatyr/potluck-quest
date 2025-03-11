import Link from "next/link";
import { PropsWithChildren } from "react";

const ExternalLink = ({
	href,
	children,
}: PropsWithChildren<{ href: string }>) => (
	<Link href={href} rel="noopener noreferrer" target="_blank">
		{children}
	</Link>
);

export default ExternalLink;
