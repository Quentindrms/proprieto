/*
  Warnings:

  - You are about to drop the column `clientsId` on the `contracts` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `contracts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_clientsId_fkey";

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "clientsId",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;
