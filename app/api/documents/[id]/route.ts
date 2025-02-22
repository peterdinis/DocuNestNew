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

	const findOneWorkspaceDocument = await db.workspaceDocument.findUnique({
		where: {
			id,
			userId: session.user.id,
		},
	});

	if (!findOneWorkspaceDocument) {
		throw new Error("Workspace document not found");
	}

	return NextResponse.json(findOneWorkspaceDocument);
}

export async function PUT(request: NextRequest) {
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

	const { name, content } = await request.json();

	const findOneWorkspaceDocument = await db.workspaceDocument.findUnique({
		where: {
			id,
			userId: session.user.id,
		},
	});

	if (!findOneWorkspaceDocument) {
		throw new Error("Workspace document not found");
	}

	const updateDocument = await db.workspaceDocument.update({
		where: {
			id: findOneWorkspaceDocument.id,
		},

		data: {
			name,
			content,
		},
	});

	if (!updateDocument) {
		throw new Error("Failed to update workspace document");
	}

	return NextResponse.json(updateDocument);
}

export async function DELETE(request: NextRequest) {
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

	const findOneWorkspaceDocument = await db.workspaceDocument.findUnique({
		where: {
			id,
			userId: session.user.id,
		},
	});

	if (!findOneWorkspaceDocument) {
		throw new Error("Workspace document not found");
	}

	const deleteOneSpecificDocument = await db.workspaceDocument.delete({
		where: {
			id: findOneWorkspaceDocument.id,
			userId: session.user.id,
		},
	});

	if (!deleteOneSpecificDocument) {
		throw new Error("Failed to delete workspace document");
	}

	return NextResponse.json(deleteOneSpecificDocument);
}
