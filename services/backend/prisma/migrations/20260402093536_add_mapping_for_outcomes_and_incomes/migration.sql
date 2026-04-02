/*
  Warnings:

  - You are about to drop the `Incomes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Outcomes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Incomes" DROP CONSTRAINT "Incomes_contractsId_fkey";

-- DropForeignKey
ALTER TABLE "Incomes" DROP CONSTRAINT "Incomes_propertiesId_fkey";

-- DropForeignKey
ALTER TABLE "Outcomes" DROP CONSTRAINT "Outcomes_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "Outcomes" DROP CONSTRAINT "Outcomes_propertiesId_fkey";

-- DropForeignKey
ALTER TABLE "Outcomes" DROP CONSTRAINT "Outcomes_providersId_fkey";

-- DropTable
DROP TABLE "Incomes";

-- DropTable
DROP TABLE "Outcomes";

-- CreateTable
CREATE TABLE "incomes" (
    "id_income" TEXT NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "amount" INTEGER NOT NULL,
    "is_recurring" BOOLEAN NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "issueDate" DATE NOT NULL,
    "paidOn" DATE NOT NULL,
    "frequency" VARCHAR(50) NOT NULL,
    "contractsId" TEXT NOT NULL,
    "propertiesId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "outcomes" (
    "id_outcome" TEXT NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "amount" INTEGER NOT NULL,
    "is_recurring" BOOLEAN NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "issueDate" DATE NOT NULL,
    "paidOn" DATE NOT NULL,
    "frequency" VARCHAR(50) NOT NULL,
    "propertiesId" TEXT NOT NULL,
    "providersId" TEXT NOT NULL,
    "categoriesId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "incomes_id_income_key" ON "incomes"("id_income");

-- CreateIndex
CREATE UNIQUE INDEX "outcomes_id_outcome_key" ON "outcomes"("id_outcome");

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_contractsId_fkey" FOREIGN KEY ("contractsId") REFERENCES "contracts"("id_contract") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers"("id_provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;
