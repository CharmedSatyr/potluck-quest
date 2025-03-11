"use client";

import { ArrowPathIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { Component, PropsWithChildren } from "react";

class ErrorBoundary extends Component<
	PropsWithChildren,
	{ hasError: boolean }
> {
	constructor(props: PropsWithChildren) {
		super(props);

		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: unknown, errorInfo: unknown) {
		console.error({ error, errorInfo });
	}

	render() {
		if (!this.state.hasError) {
			return this.props.children;
		}

		return (
			<main className="contrast-container">
				<h1 className="mt-0">Something went wrong!</h1>

				<button
					className="btn btn-secondary mb-4 w-full"
					onClick={() => this.setState({ hasError: false })}
				>
					<ArrowPathIcon className="size-4" /> Try again
				</button>

				<Link className="btn btn-primary w-full no-underline" href="/">
					<HomeModernIcon className="size-4" /> Go home
				</Link>
			</main>
		);
	}
}

export default ErrorBoundary;
