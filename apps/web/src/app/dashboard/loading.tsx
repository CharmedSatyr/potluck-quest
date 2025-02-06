import { TableFallback } from "~/app/dashboard/table-fallback";

const Loading = () => (
	<main className="contrast-container">
		<h1 className="text-primary-gradient">Dashboard</h1>

		<h2>Hosting</h2>

		<TableFallback />

		<h2>Attending</h2>
		<TableFallback />
	</main>
);

export default Loading;
