/*
  Warnings:

  - You are about to drop the column `is_reccuring` on the `income` table. All the data in the column will be lost.
  - You are about to drop the column `is_reccuring` on the `outcome` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "income" DROP COLUMN "is_reccuring",
ADD COLUMN     "is_recurring" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "outcome" DROP COLUMN "is_reccuring",
ADD COLUMN     "is_recurring" BOOLEAN NOT NULL DEFAULT false;
