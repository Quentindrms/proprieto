/*
  Warnings:

  - Added the required column `categoriesId` to the `incomes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "incomes" ADD COLUMN     "categoriesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;
