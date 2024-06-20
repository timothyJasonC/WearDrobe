/*
  Warnings:

  - You are about to drop the column `associatedWarehouseId` on the `stockmutation` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `stockmutation` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `stockmutation` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseProductID` on the `stockmutation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `stockmutation` DROP FOREIGN KEY `StockMutation_warehouseProductID_fkey`;

-- AlterTable
ALTER TABLE `stockmutation` DROP COLUMN `associatedWarehouseId`,
    DROP COLUMN `quantity`,
    DROP COLUMN `size`,
    DROP COLUMN `warehouseProductID`,
    ADD COLUMN `associatedWarehouseID` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `StockMutationItem` (
    `id` VARCHAR(191) NOT NULL,
    `size` ENUM('S', 'M', 'L', 'XL', 'ONESIZE') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `warehouseProductID` VARCHAR(191) NOT NULL,
    `stockMutationID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StockMutationItem` ADD CONSTRAINT `StockMutationItem_stockMutationID_fkey` FOREIGN KEY (`stockMutationID`) REFERENCES `StockMutation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockMutationItem` ADD CONSTRAINT `StockMutationItem_warehouseProductID_fkey` FOREIGN KEY (`warehouseProductID`) REFERENCES `WarehouseProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
