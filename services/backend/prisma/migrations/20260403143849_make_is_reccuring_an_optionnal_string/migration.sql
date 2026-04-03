-- AlterTable
ALTER TABLE "incomes" ALTER COLUMN "is_recurring" DROP NOT NULL,
ALTER COLUMN "is_recurring" SET DATA TYPE VARCHAR(20);
