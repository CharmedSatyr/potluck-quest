export const TableFallback = () => (
	<div className="border-base-300 overflow-x-auto rounded-xl border shadow-sm">
		<table className="table-pin-rows table-sm bg-base-100 my-0 table rounded-xl">
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
