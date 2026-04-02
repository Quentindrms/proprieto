/*
  Warnings:

  - You are about to drop the column `contractsId` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the column `propertiesId` on the `incomes` table. All the data in the column will be lost.
  - Added the required column `propertyId` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `incomes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "incomes" DROP CONSTRAINT "incomes_contractsId_fkey";

-- DropForeignKey
ALTER TABLE "incomes" DROP CONSTRAINT "incomes_propertiesId_fkey";

-- AlterTable
ALTER TABLE "clients" ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("id_client");

-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "propertyId" TEXT NOT NULL,
ADD CONSTRAINT "contracts_pkey" PRIMARY KEY ("id_contract");

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "contractsId",
DROP COLUMN "propertiesId",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "contractId" TEXT,
ADD COLUMN     "propertyId" TEXT NOT NULL,
ADD CONSTRAINT "incomes_pkey" PRIMARY KEY ("id_income");

-- AlterTable
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_pkey" PRIMARY KEY ("id_outcome");

-- AlterTable
ALTER TABLE "properties" ADD CONSTRAINT "properties_pkey" PRIMARY KEY ("id_property");

-- AlterTable
ALTER TABLE "providers" ADD CONSTRAINT "providers_pkey" PRIMARY KEY ("id_provider");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id_contract") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;
