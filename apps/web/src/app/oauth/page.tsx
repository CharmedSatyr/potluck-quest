import Form from "next/form";
import Image from "next/image";
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
					src="/static/login.webp"
					width="300"
					height="300"
				/>

				<button
					className="btn btn-sm bg-blurple text-base-300 hover:bg-dark-blurple w-fit"
					type="submit"
				>
					Continue with{" "}
					<Image
						src="/static/discord-logo-black.png"
						alt="Discord logo"
						height="15"
						width="80"
						className="m-0"
					/>
				</button>
			</Form>
		</main>
	);
};

export default OauthPage;
