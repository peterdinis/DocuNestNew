import { db } from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, workspaceId, role } = await req.json();

		// Find user by email
		const user = await db.user.findUnique({ where: { email } });
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const workspaceCheck = await db.workspace.findUnique({
			where: {
				id: workspaceId,
			},
		});

		if (!workspaceCheck) {
			throw new Error("Workspace does not exists");
		}

		// Check if user is already a member of the workspace
		const existingMember = await db.workspaceMember.findUnique({
			where: {
				userId_workspaceId: {
					userId: user.id,
					workspaceId,
				},
			},
		});

		if (existingMember) {
			return NextResponse.json(
				{ error: "User is already a member" },
				{ status: 400 },
			);
		}

		// Add user to workspace
		await db.workspaceMember.create({
			data: {
				userId: user.id,
				workspaceId,
				role,
			},
		});
		return NextResponse.json(email);
	} catch (error) {
		// console.error(error);
		return NextResponse.json({ error: "An error occurred" }, { status: 500 });
	}
}
