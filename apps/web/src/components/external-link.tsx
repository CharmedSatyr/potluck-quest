import Link from "next/link";
import { PropsWithChildren } from "react";

const ExternalLink = ({
	children,
	className,
	href,
}: PropsWithChildren<{ href: string; className?: string }>) => (
	<Link
		href={href}
		className={className}
		rel="noopener noreferrer"
		target="_blank"
	>
		{children}
	</Link>
);

export default ExternalLink;
