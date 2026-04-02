/*
  Warnings:

  - Made the column `contractId` on table `incomes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "incomes" DROP CONSTRAINT "incomes_contractId_fkey";

-- AlterTable
ALTER TABLE "incomes" ALTER COLUMN "paidOn" DROP NOT NULL,
ALTER COLUMN "contractId" SET NOT NULL;

-- AlterTable
ALTER TABLE "outcomes" ALTER COLUMN "paidOn" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id_contract") ON DELETE RESTRICT ON UPDATE CASCADE;
