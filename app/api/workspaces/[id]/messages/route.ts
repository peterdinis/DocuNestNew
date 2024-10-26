import { db } from "@/app/_utils/db";
import authOptions from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/')[3];

    if (!id) {
        return NextResponse.json(
            { error: 'Missing id parameter' },
            { status: 400 },
        );
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const messagesForWorkspace = await db.workspace.findFirst({
        where: {
            id
        },

        include: {
            workspaceMessages: true
        }
    });
    
    return NextResponse.json(messagesForWorkspace);
}