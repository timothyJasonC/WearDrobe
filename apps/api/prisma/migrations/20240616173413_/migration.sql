/*
  Warnings:

  - You are about to drop the column `productId` on the `warehouseproduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `warehouseproduct` DROP FOREIGN KEY `WarehouseProduct_productId_fkey`;

-- AlterTable
ALTER TABLE `warehouseproduct` DROP COLUMN `productId`;
