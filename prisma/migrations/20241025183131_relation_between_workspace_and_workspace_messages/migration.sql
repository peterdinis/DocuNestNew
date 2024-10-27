/*
  Warnings:

  - Added the required column `workspaceId` to the `WorkspaceMessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkspaceMessages" ADD COLUMN     "workspaceId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "WorkspaceMessages" ADD CONSTRAINT "WorkspaceMessages_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
