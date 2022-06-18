/*
  Warnings:

  - Added the required column `authorId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleId` to the `Commentaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `categoryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Commentaire` ADD COLUMN `articleId` INTEGER NOT NULL;
