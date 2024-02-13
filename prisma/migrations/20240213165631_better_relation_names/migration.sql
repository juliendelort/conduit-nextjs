/*
  Warnings:

  - You are about to drop the `_ArticleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToUser" DROP CONSTRAINT "_ArticleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToUser" DROP CONSTRAINT "_ArticleToUser_B_fkey";

-- DropTable
DROP TABLE "_ArticleToUser";

-- CreateTable
CREATE TABLE "_FavoritedArticles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritedArticles_AB_unique" ON "_FavoritedArticles"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritedArticles_B_index" ON "_FavoritedArticles"("B");

-- AddForeignKey
ALTER TABLE "_FavoritedArticles" ADD CONSTRAINT "_FavoritedArticles_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritedArticles" ADD CONSTRAINT "_FavoritedArticles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
