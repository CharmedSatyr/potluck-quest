import Link from "next/link";
import siteMetadata from "~/data/site-metadata";

export const PotluckQuest = () => (
	<Link className="no-underline" href="/">
		<span className="text-primary-gradient">{siteMetadata.title}</span>
	</Link>
);
