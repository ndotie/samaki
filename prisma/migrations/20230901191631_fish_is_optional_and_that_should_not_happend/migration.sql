/*
  Warnings:

  - You are about to drop the column `name` on the `fish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fish` DROP COLUMN `name`,
    ADD COLUMN `fishTypeId` INTEGER NULL;

-- CreateTable
CREATE TABLE `FishPhoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `fishTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FishType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fish` ADD CONSTRAINT `Fish_fishTypeId_fkey` FOREIGN KEY (`fishTypeId`) REFERENCES `FishType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FishPhoto` ADD CONSTRAINT `FishPhoto_fishTypeId_fkey` FOREIGN KEY (`fishTypeId`) REFERENCES `FishType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
