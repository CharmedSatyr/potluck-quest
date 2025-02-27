import Image from "next/image";
import Link from "next/link";
import discordLogoBlue from "public/static/discord-logo-blue.png";
import siteMetadata from "~/data/site-metadata";

const Footer = () => {
	return (
		<footer className="footer sm:footer-horizontal bg-base-100 border-t-base-300 bottom-0 border-t p-8">
			<div>
				<h6 className="footer-title"></h6>
				{`© ${new Date().getFullYear()}`} {siteMetadata.author}
				<Link className="link link-hover" href=""></Link>
			</div>

			<nav>
				<h6 className="footer-title">Links</h6>

				<Link
					className="link link-hover"
					href="https://discord.gg/aNMAhc4K2C"
					rel="noopener noreferrer"
					target="_blank"
				>
					Join Us On{" "}
					<Image
						alt="Discord logo"
						className="not-prose m-0 inline"
						src={discordLogoBlue}
						width={80}
					/>
				</Link>
			</nav>
			<nav>
				<h6 className="footer-title">Legal</h6>
				<Link
					className="link link-hover"
					href="https://app.termly.io/policy-viewer/policy.html?policyUUID=120a80e0-c2de-4813-9957-e5fe1ba8daf8"
				>
					Privacy Policy
				</Link>
				<Link
					className="link link-hover"
					href="https://app.termly.io/policy-viewer/policy.html?policyUUID=129758dd-5c6e-43fa-b209-adcd5a2906e2"
				>
					Terms and Conditions
				</Link>
			</nav>
		</footer>
	);
};

export default Footer;
