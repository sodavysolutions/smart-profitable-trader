-- AlterTable
ALTER TABLE "Customer"
ADD COLUMN IF NOT EXISTS "dateOfBirth" TIMESTAMP(3);
