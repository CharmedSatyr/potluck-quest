import { Suspense } from "react";
import findCommitmentsWithDetails from "~/actions/commitment/find-commitments-with-details";
import findSlotContainerDetails from "~/actions/slot/find-slot-container-details";
import CommitmentsBySlotTable, {
	CommitmentsBySlotTableFallback,
} from "~/components/commitments-by-slot-table";
import SlideIn from "~/components/slide-in";
import CreateCommitmentForm from "~/components/slot-manager/create-commitment-form";
import SlotContainer from "~/components/slot-manager/slot-container";

type Props = {
	code: string;
};

const SlotManager = async ({ code }: Props) => {
	const commitmentsWithDetails = await findCommitmentsWithDetails({ code });
	const details = await findSlotContainerDetails({ code });

	if (!details?.length) {
		return <div>No plans yet. Ask the host to add some signup slots!</div>;
	}

	return (
		<section className="join join-vertical w-full bg-base-100 shadow-sm">
			{details.map((detail) => {
				const { item, requestedCount, slotId, totalCommitments, users } =
					detail;

				return (
					<div key={slotId} className="join-item border border-base-200">
						<SlotContainer
							item={item}
							requestedCount={requestedCount}
							totalCommitments={totalCommitments}
							users={users}
						>
							<label
								className="label label-text ml-2 px-0 pb-2 pt-0"
								htmlFor="commitments-table"
							>
								Current Signups
							</label>

							{totalCommitments > 0 ? (
								<Suspense fallback={<CommitmentsBySlotTableFallback />}>
									<SlideIn>
										<CommitmentsBySlotTable
											commitmentsWithDetails={commitmentsWithDetails.filter(
												(c) => c.slotId === slotId
											)}
										/>
									</SlideIn>
								</Suspense>
							) : (
								<div className="ml-2">
									<p className="my-2">None yet. Be the first!</p>
									<div className="divider"></div>
								</div>
							)}

							{requestedCount - totalCommitments > 0 && (
								<CreateCommitmentForm
									commitmentsStillNeeded={requestedCount - totalCommitments}
									slotId={slotId}
								/>
							)}
						</SlotContainer>
					</div>
				);
			})}
		</section>
	);
};

export default SlotManager;
