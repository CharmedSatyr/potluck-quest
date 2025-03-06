import { HomeModernIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<main className="contrast-container">
			<h1 className="text-primary-gradient">Alas, this page eludes us.</h1>

			<Link className="btn w-full no-underline" href="/">
				<HomeModernIcon className="size-4" /> Home
			</Link>
		</main>
	);
};

export default NotFoundPage;
