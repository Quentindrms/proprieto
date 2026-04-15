-- AlterTable
ALTER TABLE "incomes" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "outcomes" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
