/*
  Warnings:

  - You are about to drop the column `adminID` on the `Warehouse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Warehouse` DROP FOREIGN KEY `Warehouse_adminID_fkey`;

-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `warehouseId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Warehouse` DROP COLUMN `adminID`;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
