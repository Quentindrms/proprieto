/*
  Warnings:

  - Added the required column `userId` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `providers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
