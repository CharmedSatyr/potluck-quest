import Form from "next/form";
import Image from "next/image";
import discordLogoWhite from "public/static/discord-logo-white.png";
import loginDoor from "public/static/login.webp";
import signInWithDiscordAndRevalidate from "~/actions/auth/sign-in-with-discord-and-revalidate";
import siteMetadata from "~/data/site-metadata";

const OauthPage = async () => {
	return (
		<main className="contrast-container">
			<h1 className="text-primary-gradient">Sign in to Enter</h1>

			<Form
				action={signInWithDiscordAndRevalidate}
				className="flex flex-col items-center"
			>
				<Image
					alt={`${siteMetadata.title} logo`}
					className="max-w-sm rounded-lg shadow-2xl"
					priority
					src={loginDoor}
					width="300"
				/>

				<button className="btn btn-sm btn-blurple w-fit" type="submit">
					Continue with{" "}
					<Image
						src={discordLogoWhite}
						alt="Discord logo"
						width="80"
						className="m-0"
					/>
				</button>
			</Form>
		</main>
	);
};

export default OauthPage;
