/*
  Warnings:

  - You are about to drop the column `hours` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `presentationLink` on the `Lesson` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('PDF', 'LINK', 'VIDEO', 'TEXT');

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "hours",
DROP COLUMN "presentationLink";

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL DEFAULT 'LINK',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
