-- AlterTable
ALTER TABLE "UploadedDocument" ADD COLUMN     "workspaceId" TEXT NOT NULL DEFAULT '1222';

-- AddForeignKey
ALTER TABLE "UploadedDocument" ADD CONSTRAINT "UploadedDocument_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
