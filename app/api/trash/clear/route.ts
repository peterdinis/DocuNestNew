import { db } from "@/app/_utils/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function DELETE() {
	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	await db.workspace.deleteMany({
		where: {
			userId: session.user.id,
		},
	});

	await axios.post("/api/notifications", {
		userId: session.user.id,
		title: "Trash",
		message: `You cleaned trash`,
	});
	return NextResponse.json({
		message: "Trash was cleaned",
	});
}
