import { auth } from "~/auth";
import DeleteCommitmentForm from "~/components/slot-manager/delete-commitment-form";
import UserAvatar from "~/components/user-avatar";

type Props = {
	commitmentsWithDetails: {
		commitmentId: string;
		description: string;
		item: string;
		quantity: number;
		user: {
			id: string | null;
			image: string | null;
			name: string | null;
		};
	}[];
};

const CommitmentsBySlotTable = async ({ commitmentsWithDetails }: Props) => {
	if (!commitmentsWithDetails?.length) {
		return <p>No plans yet!</p>;
	}

	const session = await auth();

	return (
		<div className="mt-0 overflow-x-auto p-0">
			<table className="table-sm mt-0 mb-0 table p-0">
				<thead className="m-0 p-0">
					<tr>
						<th></th>
						<th>User</th>
						<th className="md:hidden">#</th>
						<th className="hidden md:block">Quantity</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{commitmentsWithDetails.map((c) => {
						return (
							<tr key={c.commitmentId}>
								<td>
									{c.user.id === session?.user?.id && (
										<DeleteCommitmentForm id={c.commitmentId} />
									)}
								</td>
								<td>
									<UserAvatar name={c.user.name} url={c.user.image} />{" "}
									{c.user.name}
								</td>
								<td>{c.quantity}</td>
								<td>{c.description}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CommitmentsBySlotTable;

export const CommitmentsBySlotTableFallback = () => {
	return (
		<div className="mt-0 overflow-x-auto p-0">
			<table className="table-sm mt-0 mb-0 table p-0">
				<thead className="m-0 p-0">
					<tr>
						<th></th>
						<th>User</th>
						<th className="md:hidden">#</th>
						<th className="hidden md:block">Quantity</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="w-23 align-top">
							<button
								className="btn btn-circle btn-xs mt-6"
								type="button"
								disabled
							>
								✕
							</button>
						</td>
						<td className="h-20">
							<div className="skeleton mt-5 h-8 w-22" />
						</td>
						<td className="">
							<div className="skeleton h-8 w-22" />
						</td>
						<td className="">
							<div className="skeleton h-8 w-28" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
