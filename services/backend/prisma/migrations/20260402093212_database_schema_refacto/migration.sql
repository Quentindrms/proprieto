/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `income` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `income_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outcome` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outcome_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `provider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_userId_fkey";

-- DropForeignKey
ALTER TABLE "contract" DROP CONSTRAINT "contract_clientId_fkey";

-- DropForeignKey
ALTER TABLE "contract" DROP CONSTRAINT "contract_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "income" DROP CONSTRAINT "income_clientId_fkey";

-- DropForeignKey
ALTER TABLE "income" DROP CONSTRAINT "income_contractId_fkey";

-- DropForeignKey
ALTER TABLE "income" DROP CONSTRAINT "income_incomeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "income" DROP CONSTRAINT "income_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "outcome" DROP CONSTRAINT "outcome_outcomeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "outcome" DROP CONSTRAINT "outcome_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "outcome" DROP CONSTRAINT "outcome_providerId_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_propertyTypeId_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_userId_fkey";

-- DropForeignKey
ALTER TABLE "provider" DROP CONSTRAINT "provider_userId_fkey";

-- DropTable
DROP TABLE "client";

-- DropTable
DROP TABLE "contract";

-- DropTable
DROP TABLE "income";

-- DropTable
DROP TABLE "income_category";

-- DropTable
DROP TABLE "outcome";

-- DropTable
DROP TABLE "outcome_category";

-- DropTable
DROP TABLE "property";

-- DropTable
DROP TABLE "property_type";

-- DropTable
DROP TABLE "provider";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "entity_types" (
    "id_entity_type" TEXT NOT NULL,
    "slug" VARCHAR(75) NOT NULL,
    "name" VARCHAR(75) NOT NULL,

    CONSTRAINT "entity_types_pkey" PRIMARY KEY ("id_entity_type")
);

-- CreateTable
CREATE TABLE "categories" (
    "id_category" TEXT NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "directories" (
    "id_directory" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "first_name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(250) NOT NULL,

    CONSTRAINT "directories_pkey" PRIMARY KEY ("id_directory")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" TEXT NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "directoriesId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "properties" (
    "id_property" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "purchase_price" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "sell_price" INTEGER,
    "sell_date" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "entityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "clients" (
    "id_client" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "directoriesId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "providers" (
    "id_provider" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "directoriesId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contracts" (
    "id_contract" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "lease" INTEGER NOT NULL,
    "clientsId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Incomes" (
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
CREATE TABLE "Outcomes" (
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
CREATE UNIQUE INDEX "entity_types_id_entity_type_key" ON "entity_types"("id_entity_type");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_category_key" ON "categories"("id_category");

-- CreateIndex
CREATE UNIQUE INDEX "directories_id_directory_key" ON "directories"("id_directory");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_user_key" ON "users"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "users_directoriesId_key" ON "users"("directoriesId");

-- CreateIndex
CREATE UNIQUE INDEX "properties_id_property_key" ON "properties"("id_property");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_client_key" ON "clients"("id_client");

-- CreateIndex
CREATE UNIQUE INDEX "providers_id_provider_key" ON "providers"("id_provider");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_id_contract_key" ON "contracts"("id_contract");

-- CreateIndex
CREATE UNIQUE INDEX "Incomes_id_income_key" ON "Incomes"("id_income");

-- CreateIndex
CREATE UNIQUE INDEX "Outcomes_id_outcome_key" ON "Outcomes"("id_outcome");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_directoriesId_fkey" FOREIGN KEY ("directoriesId") REFERENCES "directories"("id_directory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entity_types"("id_entity_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_directoriesId_fkey" FOREIGN KEY ("directoriesId") REFERENCES "directories"("id_directory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_directoriesId_fkey" FOREIGN KEY ("directoriesId") REFERENCES "directories"("id_directory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_contractsId_fkey" FOREIGN KEY ("contractsId") REFERENCES "contracts"("id_contract") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcomes" ADD CONSTRAINT "Outcomes_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcomes" ADD CONSTRAINT "Outcomes_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers"("id_provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcomes" ADD CONSTRAINT "Outcomes_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;
