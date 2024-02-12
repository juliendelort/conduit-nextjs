/*
  Warnings:

  - You are about to drop the column `slug` on the `Article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Article_slug_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "slug";
