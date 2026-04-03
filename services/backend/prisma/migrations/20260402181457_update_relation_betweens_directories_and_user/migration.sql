/*
  Warnings:

  - You are about to drop the column `directoriesId` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `directories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_directoriesId_fkey";

-- AlterTable
ALTER TABLE "directories" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "directoriesId";

-- AddForeignKey
ALTER TABLE "directories" ADD CONSTRAINT "directories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
