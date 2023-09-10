/*
  Warnings:

  - You are about to drop the column `amount` on the `wallet` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `wallet` DROP COLUMN `amount`,
    DROP COLUMN `paymentDate`;

-- CreateTable
CREATE TABLE `Payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `walletId` INTEGER NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amount` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
