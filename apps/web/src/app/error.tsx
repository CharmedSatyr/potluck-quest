"use client";

import { ArrowPathIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect } from "react";

const ErrorBoundary = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="contrast-container">
			<h1 className="mt-0">Something went wrong!</h1>

			<button className="btn btn-secondary mb-4 w-full" onClick={reset}>
				<ArrowPathIcon className="size-4" /> Try again
			</button>

			<Link className="btn btn-primary w-full no-underline" href="/">
				<HomeModernIcon className="size-4" /> Home
			</Link>
		</main>
	);
};

export default ErrorBoundary;
