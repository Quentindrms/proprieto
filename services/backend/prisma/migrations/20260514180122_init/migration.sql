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
    "type" VARCHAR(50) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "directories_pkey" PRIMARY KEY ("id_directory")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" TEXT NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(150) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(100) NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
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
    "typeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id_property")
);

-- CreateTable
CREATE TABLE "clients" (
    "id_client" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "directoriesId" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id_client")
);

-- CreateTable
CREATE TABLE "providers" (
    "id_provider" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "directoriesId" TEXT NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id_provider")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id_contract" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "lease" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id_contract")
);

-- CreateTable
CREATE TABLE "incomes" (
    "id_income" TEXT NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "amount" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "issueDate" DATE NOT NULL,
    "paidOn" DATE,
    "frequency" VARCHAR(50),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "contractId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "incomes_pkey" PRIMARY KEY ("id_income")
);

-- CreateTable
CREATE TABLE "outcomes" (
    "id_outcome" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "amount" INTEGER NOT NULL,
    "is_recurring" BOOLEAN NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "issueDate" DATE NOT NULL,
    "paidOn" DATE,
    "frequency" VARCHAR(50) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "propertyId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "outcomes_pkey" PRIMARY KEY ("id_outcome")
);

-- CreateIndex
CREATE UNIQUE INDEX "entity_types_id_entity_type_key" ON "entity_types"("id_entity_type");

-- CreateIndex
CREATE UNIQUE INDEX "entity_types_slug_key" ON "entity_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_category_key" ON "categories"("id_category");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "directories_id_directory_key" ON "directories"("id_directory");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_user_key" ON "users"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_key" ON "tokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_userId_key" ON "tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "properties_id_property_key" ON "properties"("id_property");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_client_key" ON "clients"("id_client");

-- CreateIndex
CREATE UNIQUE INDEX "providers_id_provider_key" ON "providers"("id_provider");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_id_contract_key" ON "contracts"("id_contract");

-- CreateIndex
CREATE UNIQUE INDEX "incomes_id_income_key" ON "incomes"("id_income");

-- CreateIndex
CREATE UNIQUE INDEX "outcomes_id_outcome_key" ON "outcomes"("id_outcome");

-- AddForeignKey
ALTER TABLE "directories" ADD CONSTRAINT "directories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "entity_types"("id_entity_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_directoriesId_fkey" FOREIGN KEY ("directoriesId") REFERENCES "directories"("id_directory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_directoriesId_fkey" FOREIGN KEY ("directoriesId") REFERENCES "directories"("id_directory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id_contract") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id_provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;
