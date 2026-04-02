/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the column `categoriesId` on the `outcomes` table. All the data in the column will be lost.
  - You are about to drop the column `propertiesId` on the `outcomes` table. All the data in the column will be lost.
  - You are about to drop the column `providersId` on the `outcomes` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `outcomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `outcomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `outcomes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "incomes" DROP CONSTRAINT "incomes_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "outcomes" DROP CONSTRAINT "outcomes_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "outcomes" DROP CONSTRAINT "outcomes_propertiesId_fkey";

-- DropForeignKey
ALTER TABLE "outcomes" DROP CONSTRAINT "outcomes_providersId_fkey";

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "categoriesId",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outcomes" DROP COLUMN "categoriesId",
DROP COLUMN "propertiesId",
DROP COLUMN "providersId",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "propertyId" TEXT NOT NULL,
ADD COLUMN     "providerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id_provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;
