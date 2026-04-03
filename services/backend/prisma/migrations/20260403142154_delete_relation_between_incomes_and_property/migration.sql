/*
  Warnings:

  - You are about to drop the column `propertyId` on the `incomes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "incomes" DROP CONSTRAINT "incomes_propertyId_fkey";

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "propertyId";
