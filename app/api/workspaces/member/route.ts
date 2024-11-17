import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function GET(request: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const userId = session.user.id;

	// Get pagination parameters
	const { searchParams } = new URL(request.url);
	const page = Number.parseInt(searchParams.get("page")!) || 1;
	const limit = Number.parseInt(searchParams.get("limit")!) || 10;
	const offset = (page - 1) * limit;

	// Get paginated workspaces where the user is a member
	const workspaces = await db.workspaceMember.findMany({
		where: { userId },
		include: { workspace: true },
		skip: offset,
		take: limit,
	});

	const totalCount = await db.workspaceMember.count({
		where: { userId },
	});

	return NextResponse.json({
		workspaces: workspaces.map((wm) => wm.workspace),
		totalPages: Math.ceil(totalCount / limit),
		currentPage: page,
	});
}
