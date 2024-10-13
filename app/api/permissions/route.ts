import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../auth/authOptions";
import { db } from "@/app/_utils/db";

export async function GET() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const findMemberInWorkspace = await db.workspaceMember.findFirst({
        where: {
            userId: session.user.id
        }
    });

    if(!findMemberInWorkspace) {
        throw new Error("User does not exists in workspace");
    }

    return NextResponse.json({
        findMemberInWorkspace
    })
}