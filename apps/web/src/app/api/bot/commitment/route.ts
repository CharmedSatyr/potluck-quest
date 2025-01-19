import { webApiBot } from "@potluck/utilities/validation";
import { NextRequest, NextResponse } from "next/server";
import createCommitment from "~/actions/commitment/create-commitment";
import findUserIdByProviderAccountId from "~/actions/user/find-user-id-by-provider-account-id";

export const POST = async (request: NextRequest) => {
	const data = await request.json();

	const parsed = webApiBot.commitment.postSchema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json(
			{
				errors: parsed.error.flatten().fieldErrors,
				message: "Invalid parameters",
			},
			{ status: 400 }
		);
	}

	const { discordUserId, description, quantity, slotId } = parsed.data;

	const [createdBy] = await findUserIdByProviderAccountId({
		providerAccountId: discordUserId,
	});

	if (!createdBy) {
		return NextResponse.json(null, { status: 401 });
	}

	const [result] = await createCommitment({
		createdBy: createdBy.id,
		description,
		quantity,
		slotId,
	});

	if (!result?.id) {
		return NextResponse.json(null, { status: 500 });
	}

	return NextResponse.json(null, { status: 200 });
};
