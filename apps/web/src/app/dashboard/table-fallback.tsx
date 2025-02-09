export const TableFallback = () => (
	<div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm">
		<table className="table table-pin-rows table-sm my-0 rounded-xl bg-base-100">
			<thead>
				<tr>
					<th>Code</th>
					<th>Name</th>
					<th>Date</th>
					<th className="hidden md:table-cell">Location</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td className="hidden md:table-cell">
						<div className="skeleton h-8" />
					</td>
				</tr>
				<tr>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td className="hidden md:table-cell">
						<div className="skeleton h-8" />
					</td>
				</tr>
				<tr>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td>
						<div className="skeleton h-8" />
					</td>
					<td className="hidden md:table-cell">
						<div className="skeleton h-8" />
					</td>
				</tr>
			</tbody>
		</table>
	</div>
);
