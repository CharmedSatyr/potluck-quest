export const TableFallback = () => (
	<div className="border-base-300 bg-base-100 overflow-x-auto rounded-xl border shadow-sm">
		<table className="table-sm mt-0 mb-0 table table-auto">
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
					<td className="w-22">
						<div className="skeleton h-8 w-16" />
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
					<td className="w-22">
						<div className="skeleton h-8 w-16" />
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
					<td className="w-22">
						<div className="skeleton h-8 w-16" />
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
