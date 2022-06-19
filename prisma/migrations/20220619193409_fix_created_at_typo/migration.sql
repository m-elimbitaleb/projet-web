/*
  Warnings:

  - You are about to drop the column `dateCreation` on the `Utilisateur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Utilisateur` DROP COLUMN `dateCreation`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
