-- CreateTable
CREATE TABLE "user" (
    "id_user" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "first_name" VARCHAR(120) NOT NULL,
    "address" VARCHAR(250) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "phone" VARCHAR(20),
    "password" VARCHAR(250) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "property_type" (
    "id_property" UUID NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "property_type_pkey" PRIMARY KEY ("id_property")
);

-- CreateTable
CREATE TABLE "client" (
    "id_client" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "first_name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "address" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id_client")
);

-- CreateTable
CREATE TABLE "providers" (
    "id_provider" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "first_name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "address" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id_provider")
);

-- CreateTable
CREATE TABLE "outcome_category" (
    "id_outcome_category" UUID NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "outcome_category_pkey" PRIMARY KEY ("id_outcome_category")
);

-- CreateTable
CREATE TABLE "income_category" (
    "id_income_category" UUID NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "income_category_pkey" PRIMARY KEY ("id_income_category")
);

-- CreateTable
CREATE TABLE "property" (
    "id_property" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "purchase_price" INTEGER,
    "purchase_date" TIMESTAMP(3),
    "sell_price" INTEGER,
    "sell_date" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL,
    "userId" UUID NOT NULL,
    "propertyTypeId" UUID,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id_property")
);

-- CreateTable
CREATE TABLE "outcome" (
    "id_outcome" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "amount" INTEGER NOT NULL,
    "is_reccuring" BOOLEAN NOT NULL,
    "is_paid" BOOLEAN NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "paid_on" TIMESTAMP(3) NOT NULL,
    "frequency" VARCHAR(50) NOT NULL,
    "propertyId" UUID NOT NULL,
    "outcomeCategoryId" UUID NOT NULL,
    "providersId" UUID NOT NULL,

    CONSTRAINT "outcome_pkey" PRIMARY KEY ("id_outcome")
);

-- CreateTable
CREATE TABLE "income" (
    "id_income" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "amount" INTEGER NOT NULL,
    "is_reccuring" BOOLEAN NOT NULL,
    "is_paid" BOOLEAN NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "paid_on" TIMESTAMP(3) NOT NULL,
    "frequency" VARCHAR(50) NOT NULL,
    "propertyId" UUID NOT NULL,
    "incomeCategoryId" UUID NOT NULL,
    "contractId" UUID,
    "clientId" UUID NOT NULL,

    CONSTRAINT "income_pkey" PRIMARY KEY ("id_income")
);

-- CreateTable
CREATE TABLE "contract" (
    "id_contract" UUID NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "lease" INTEGER NOT NULL,
    "propertyId" UUID NOT NULL,
    "clientId" UUID NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id_contract")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_user_key" ON "user"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "property_type_id_property_key" ON "property_type"("id_property");

-- CreateIndex
CREATE UNIQUE INDEX "property_type_slug_key" ON "property_type"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "client_id_client_key" ON "client"("id_client");

-- CreateIndex
CREATE UNIQUE INDEX "providers_id_provider_key" ON "providers"("id_provider");

-- CreateIndex
CREATE UNIQUE INDEX "outcome_category_id_outcome_category_key" ON "outcome_category"("id_outcome_category");

-- CreateIndex
CREATE UNIQUE INDEX "outcome_category_slug_key" ON "outcome_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "income_category_id_income_category_key" ON "income_category"("id_income_category");

-- CreateIndex
CREATE UNIQUE INDEX "income_category_slug_key" ON "income_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "property_id_property_key" ON "property"("id_property");

-- CreateIndex
CREATE UNIQUE INDEX "outcome_id_outcome_key" ON "outcome"("id_outcome");

-- CreateIndex
CREATE UNIQUE INDEX "income_id_income_key" ON "income"("id_income");

-- CreateIndex
CREATE UNIQUE INDEX "contract_id_contract_key" ON "contract"("id_contract");

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "property_type"("id_property") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_outcomeCategoryId_fkey" FOREIGN KEY ("outcomeCategoryId") REFERENCES "outcome_category"("id_outcome_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers"("id_provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_incomeCategoryId_fkey" FOREIGN KEY ("incomeCategoryId") REFERENCES "income_category"("id_income_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract"("id_contract") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;
