/*
  Warnings:

  - You are about to drop the column `is_recurring` on the `incomes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "is_recurring",
ALTER COLUMN "frequency" DROP NOT NULL;
