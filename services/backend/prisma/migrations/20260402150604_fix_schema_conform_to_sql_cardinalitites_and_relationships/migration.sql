-- DropIndex
DROP INDEX "users_directoriesId_key";

-- AlterTable
ALTER TABLE "outcomes" ALTER COLUMN "name" SET DATA TYPE VARCHAR(150);
