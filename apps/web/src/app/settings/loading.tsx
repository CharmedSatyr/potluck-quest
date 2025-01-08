const Loading = () => (
	<div className="mb-2 flex w-full flex-col gap-4">
		<div className="skeleton h-12 w-1/3 md:h-16" />
		<div className="skeleton h-8 w-3/4" />
		<div className="skeleton h-8 w-1/2" />
	</div>
);

export default Loading;
