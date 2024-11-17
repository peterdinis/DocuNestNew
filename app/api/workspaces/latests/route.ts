import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const latestWorkspaces = await db.workspace.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
		take: 3,
	});

	return NextResponse.json({
		workspaces: latestWorkspaces,
	});
}
