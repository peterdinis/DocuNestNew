import { db } from "@/app/_utils/db";
import authOptions from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
	const url = new URL(request.url);
	const pathnameParts = url.pathname.split("/");

	const id = pathnameParts[pathnameParts.length - 2];

	if (!id) {
		return NextResponse.json(
			{ error: "Missing id parameter" },
			{ status: 400 },
		);
	}

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const findWorkspace = await db.workspace.findFirst({
		where: {
			id,
		},
	});
	if (!findWorkspace) {
		throw new Error("Workspace not found");
	}

	const moveWorkspaceToTrash = await db.workspace.update({
		where: {
			id: findWorkspace.id,
		},

		data: {
			inTrash: false,
		},
	});

	if (!moveWorkspaceToTrash) {
		throw new Error("Failed to move restore workspace to trash");
	}

	return NextResponse.json(moveWorkspaceToTrash);
}
