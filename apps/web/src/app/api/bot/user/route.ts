import { webApiBot } from "@potluck/utilities/validation";
import { NextRequest, NextResponse } from "next/server";
import findUserIdByProviderAccountId from "~/actions/user/find-user-id-by-provider-account-id";

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl;

	const providerAccountId = searchParams.get("providerAccountId");

	const parsed = webApiBot.user.getSchema.safeParse({ providerAccountId });

	if (!parsed.success) {
		return NextResponse.json(null, { status: 400 });
	}

	const [user] = await findUserIdByProviderAccountId({
		providerAccountId: parsed.data.providerAccountId,
	});

	return NextResponse.json({ exists: Boolean(user?.id) }, { status: 200 });
};
