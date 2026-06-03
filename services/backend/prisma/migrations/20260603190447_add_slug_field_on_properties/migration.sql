/*
  Warnings:

  - Added the required column `slug` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "slug" VARCHAR(150) NOT NULL;
