import { TableFallback } from "~/app/dashboard/table-fallback";

const Loading = () => (
	<div className="flex w-full flex-col gap-10">
		<div className="skeleton h-12 w-1/3" />
		<div className="mb-6 flex flex-col gap-4">
			<div className="skeleton h-12 w-2/12" />
			<TableFallback />
		</div>

		<div className="flex flex-col gap-4">
			<div className="skeleton h-12 w-1/4" />
			<TableFallback />
		</div>
	</div>
);

export default Loading;
