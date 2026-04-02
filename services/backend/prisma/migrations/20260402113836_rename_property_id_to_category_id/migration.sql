/*
  Warnings:

  - You are about to drop the column `entityId` on the `properties` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_entityId_fkey";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "entityId",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "entity_types"("id_entity_type") ON DELETE RESTRICT ON UPDATE CASCADE;
