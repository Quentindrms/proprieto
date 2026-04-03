/*
  Warnings:

  - You are about to drop the column `userId` on the `contracts` table. All the data in the column will be lost.
  - Added the required column `propertyId` to the `contracts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_userId_fkey";

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "userId",
ADD COLUMN     "propertyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;
