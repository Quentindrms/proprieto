/*
  Warnings:

  - You are about to drop the column `propertyId` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `properties` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "incomes" DROP CONSTRAINT "incomes_clientId_fkey";

-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_categoryId_fkey";

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "propertyId";

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "clientId";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "categoryId",
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "entity_types"("id_entity_type") ON DELETE RESTRICT ON UPDATE CASCADE;
