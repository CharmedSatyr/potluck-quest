const Loading = () => (
	<div className="mb-2 flex w-full flex-col gap-8">
		<div className="skeleton h-12 w-1/3 md:h-10" />

		<div className="-m-4 flex flex-col gap-4 rounded-xl bg-base-100 p-4">
			<div className="skeleton h-10 w-3/4" />
			<div className="skeleton h-10 w-1/2" />
		</div>
	</div>
);

export default Loading;
