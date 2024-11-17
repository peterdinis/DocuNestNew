import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../auth/authOptions";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const allCountedMyWorkspaceDocuments = await db.workspaceDocument.count({
		where: {
			userId: session.user.id,
		},
	});

	return NextResponse.json({
		totalCount: allCountedMyWorkspaceDocuments,
	});
}
