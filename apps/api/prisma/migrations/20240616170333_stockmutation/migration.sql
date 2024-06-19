/*
  Warnings:

  - You are about to drop the column `productVariantID` on the `stockmutation` table. All the data in the column will be lost.
  - Added the required column `warehouseProductID` to the `StockMutation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stockmutation` DROP FOREIGN KEY `StockMutation_productVariantID_fkey`;

-- AlterTable
ALTER TABLE `stockmutation` DROP COLUMN `productVariantID`,
    ADD COLUMN `warehouseProductID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `StockMutation` ADD CONSTRAINT `StockMutation_warehouseProductID_fkey` FOREIGN KEY (`warehouseProductID`) REFERENCES `WarehouseProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
