import { HeartIcon } from "@heroicons/react/24/solid";
import { ContactEmailReversed } from "@potluck/utilities/constants";
import Image from "next/image";
import Link from "next/link";
import discordLogoBlue from "public/static/discord-logo-blue.png";
import ContactEmail from "~/components/contact-email";
import ExternalLink from "~/components/external-link";
import siteMetadata from "~/data/site-metadata";

const Footer = () => {
	return (
		<footer className="footer sm:footer-horizontal bg-base-200 border-t-base-300 border-t p-8">
			<div>
				<h6 className="footer-title">About</h6>
				<div>
					Made with <HeartIcon className="-mt-px inline size-4 text-red-500" />{" "}
					in Seattle
				</div>

				<div>
					{`© ${new Date().getFullYear()}`} {siteMetadata.company}
				</div>
			</div>

			<nav>
				<h6 className="footer-title">Contact</h6>
				<div>
					<ExternalLink
						className="link link-hover"
						href="https://discord.gg/Juk7qbh2VY"
					>
						Join the{" "}
						<Image
							alt="Discord logo"
							className="not-prose m-0 inline hover:scale-105"
							src={discordLogoBlue}
							width={80}
						/>
					</ExternalLink>
				</div>

				<div>
					<Link
						className="link link-hover"
						href={`mailto:${ContactEmailReversed.split("").reverse().join("")}`}
					>
						<ContactEmail />
					</Link>
				</div>
			</nav>

			<nav>
				<h6 className="footer-title">Legal</h6>
				<div>
					<Link className="link link-hover" href="/privacy">
						Privacy Policy
					</Link>
				</div>
				<div>
					<Link className="link link-hover" href="/terms">
						Terms and Conditions
					</Link>
				</div>
			</nav>
		</footer>
	);
};

export default Footer;
