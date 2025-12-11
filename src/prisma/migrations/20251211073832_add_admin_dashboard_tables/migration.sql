-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "minRole" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "BannedUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT,
    "bannedBy" TEXT NOT NULL DEFAULT 'SYSTEM',
    "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BannedUser_email_key" ON "BannedUser"("email");
