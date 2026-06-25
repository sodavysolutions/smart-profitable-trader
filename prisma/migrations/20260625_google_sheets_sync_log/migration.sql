-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('SUCCESS', 'FAILED', 'RETRY_PENDING');

-- CreateTable
CREATE TABLE "SyncLog" (
    "id" TEXT NOT NULL,
    "recordType" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "status" "SyncStatus" NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SyncLog_recordType_recordId_idx" ON "SyncLog"("recordType", "recordId");

-- CreateIndex
CREATE INDEX "SyncLog_status_createdAt_idx" ON "SyncLog"("status", "createdAt");
