/*
  Warnings:

  - You are about to drop the column `providersId` on the `outcome` table. All the data in the column will be lost.
  - Added the required column `providerId` to the `outcome` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "outcome" DROP CONSTRAINT "outcome_providersId_fkey";

-- AlterTable
ALTER TABLE "outcome" DROP COLUMN "providersId",
ADD COLUMN     "providerId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id_provider") ON DELETE RESTRICT ON UPDATE CASCADE;
