import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const id = url.pathname.split("/").pop();

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

	const findOneWorkspace = await db.workspace.findUnique({
		where: {
			id,
			userId: session.user.id,
		},
	});

	if (!findOneWorkspace) {
		throw new Error("Workspace not found");
	}

	return NextResponse.json(findOneWorkspace);
}

export async function PUT(request: NextRequest) {
	const url = new URL(request.url);
	const id = url.pathname.split("/").pop();

	const { name, workspaceEmoji, description } = await request.json();

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

	const findOneWorkspace = await db.workspace.findUnique({
		where: {
			id,
			userId: session.user.id,
		},
	});

	if (!findOneWorkspace) {
		throw new Error("Workspace not found");
	}

	const updateActualWorkspace = await db.workspace.update({
		where: {
			id: findOneWorkspace.id,
		},

		data: {
			name,
			workspaceEmoji,
			description,
		},
	});

	if (!updateActualWorkspace) {
		throw new Error("Failed to update workspace");
	}

	return NextResponse.json(updateActualWorkspace);
}
