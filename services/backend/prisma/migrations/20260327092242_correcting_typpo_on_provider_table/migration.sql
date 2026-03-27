/*
  Warnings:

  - You are about to drop the `providers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "outcome" DROP CONSTRAINT "outcome_providerId_fkey";

-- DropForeignKey
ALTER TABLE "providers" DROP CONSTRAINT "providers_userId_fkey";

-- DropTable
DROP TABLE "providers";

-- CreateTable
CREATE TABLE "provider" (
    "id_provider" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "first_name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "address" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("id_provider")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_id_provider_key" ON "provider"("id_provider");

-- AddForeignKey
ALTER TABLE "provider" ADD CONSTRAINT "provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider"("id_provider") ON DELETE RESTRICT ON UPDATE CASCADE;
