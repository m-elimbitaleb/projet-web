/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreation` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `prix` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `quantite` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreation` on the `Categorie` table. All the data in the column will be lost.
  - You are about to drop the column `commentaire` on the `Commentaire` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreation` on the `Commentaire` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Commentaire` table. All the data in the column will be lost.
  - Added the required column `contenu` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titre` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenu` to the `Commentaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Commentaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Article_nom_key` ON `Article`;

-- DropIndex
DROP INDEX `Commentaire_commentaire_key` ON `Commentaire`;

-- AlterTable
ALTER TABLE `Article` DROP COLUMN `categoryId`,
    DROP COLUMN `dateCreation`,
    DROP COLUMN `nom`,
    DROP COLUMN `prix`,
    DROP COLUMN `quantite`,
    ADD COLUMN `contenu` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `image` LONGBLOB NOT NULL,
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `titre` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Categorie` DROP COLUMN `dateCreation`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Commentaire` DROP COLUMN `commentaire`,
    DROP COLUMN `dateCreation`,
    DROP COLUMN `userId`,
    ADD COLUMN `contenu` VARCHAR(1024) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
