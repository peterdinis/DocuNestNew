import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/app/_utils/db';

export async function GET(req: Request) {
  const session = await getServerSession({ req });

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const userId = session.user.id;

  // Get all workspaces where the user is a member
  const workspaces = await db.workspaceMember.findMany({
    where: { userId },
    include: {
      workspace: true,
    },
  });

  return NextResponse.json(workspaces.map((wm) => wm.workspace));
}