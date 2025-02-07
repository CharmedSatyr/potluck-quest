import findCommitmentsWithDetails from "~/actions/commitment/find-commitments-with-details";
import UserAvatar from "~/components/user-avatar";

type Props = {
	code: string;
};

const CommitmentsTable = async ({ code }: Props) => {
	const commitmentsWithDetails = await findCommitmentsWithDetails({ code });

	if (!commitmentsWithDetails?.length) {
		return <p>No plans yet!</p>;
	}

	return (
		<div className="overflow-x-auto">
			<table className="table table-sm md:table-md">
				<thead>
					<tr>
						<th>User</th>
						<th>Item</th>
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
									<UserAvatar name={c.user.name} url={c.user.image} />{" "}
									{c.user.name}
								</td>
								<td>{c.item}</td>
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

export default CommitmentsTable;
