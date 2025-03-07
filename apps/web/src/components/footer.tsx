import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import discordLogoBlue from "public/static/discord-logo-blue.png";

const Footer = () => {
	return (
		<footer className="footer sm:footer-horizontal bg-base-200 border-t-base-300 border-t p-8">
			<div>
				<h6 className="footer-title">About</h6>
				<div>
					Made with <HeartIcon className="inline size-4" /> in Seattle
				</div>

				<div>{`© ${new Date().getFullYear()}`} Dionysian Ventures</div>
			</div>

			<nav>
				<h6 className="footer-title">Contact</h6>
				<div>
					<Link
						className="link link-hover"
						href="https://discord.gg/Juk7qbh2VY"
						rel="noopener noreferrer"
						target="_blank"
					>
						Join the{" "}
						<Image
							alt="Discord logo"
							className="not-prose m-0 inline hover:scale-105"
							src={discordLogoBlue}
							width={80}
						/>
					</Link>
				</div>

				<div>
					<Link className="link link-hover" href="mailto:contact@potluck.quest">
						contact@potluck.quest
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
