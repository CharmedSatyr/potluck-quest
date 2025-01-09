import { NextRequest, NextResponse } from "next/server";
import findTimezone from "~/actions/settings/find-timezone";
import findUserIdByProviderAccountId from "~/actions/user/find-user-id-by-provider-account-id";

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl;

	const discordUserId = searchParams.get("discordUserId");

	if (!discordUserId) {
		return NextResponse.json(
			{ message: "Discord user ID required" },
			{ status: 400 }
		);
	}

	const [result] = await findUserIdByProviderAccountId({
		providerAccountId: discordUserId,
	});

	if (!result?.id) {
		return NextResponse.json({ message: "User not found" }, { status: 404 });
	}

	const [timezone] = await findTimezone({ userId: result.id });

	if (!timezone) {
		return NextResponse.json(
			{ message: "Timezone not found" },
			{ status: 404 }
		);
	}

	return NextResponse.json(timezone, { status: 200 });
};
