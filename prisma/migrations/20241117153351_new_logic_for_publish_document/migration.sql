/*
  Warnings:

  - A unique constraint covering the columns `[publicUrl]` on the table `WorkspaceDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WorkspaceDocument" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publicUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceDocument_publicUrl_key" ON "WorkspaceDocument"("publicUrl");
