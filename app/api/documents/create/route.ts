import { db } from "@/app/_utils/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session.user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		const { name, content, workspaceId } = await req.json();

		const existingDocument = await db.workspaceDocument.findFirst({
			where: {
				name,
				workspaceId,
			},
		});

		if (existingDocument) {
			return NextResponse.json(
				{
					error: "Document with the same name already exists in this workspace",
				},
				{ status: 400 },
			);
		}

		const createWorkspaceDocument = await db.workspaceDocument.create({
			data: {
				name,
				userId: session.user.id,
				content,
				workspaceId,
			},
		});

		/* await axios.post('/api/notifications', {
            userId: session.user.id,
            title: 'New Document',
            message: `New document was created for workspace - ${createWorkspaceDocument.name}`,
        }); */

		if (!createWorkspaceDocument) {
			return new NextResponse("Failed to create workspace document", {
				status: 500,
			});
		}

		revalidatePath("/dashboard");

		return NextResponse.json(createWorkspaceDocument, { status: 201 });
	} catch (error) {
		return new NextResponse("Server error", { status: 500 });
	}
}
