/*
  Warnings:

  - Added the required column `usersId` to the `contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "usersId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
