/*
  Warnings:

  - You are about to drop the column `warehouseId` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminID]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_warehouseId_fkey`;

-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `warehouseId`;

-- AlterTable
ALTER TABLE `Warehouse` ADD COLUMN `adminID` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Warehouse_adminID_key` ON `Warehouse`(`adminID`);

-- AddForeignKey
ALTER TABLE `Warehouse` ADD CONSTRAINT `Warehouse_adminID_fkey` FOREIGN KEY (`adminID`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
