/*
  Warnings:

  - You are about to drop the column `size` on the `productvariant` table. All the data in the column will be lost.
  - Added the required column `size` to the `WarehouseProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `oneSize` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `productvariant` DROP COLUMN `size`;

-- AlterTable
ALTER TABLE `warehouseproduct` ADD COLUMN `size` ENUM('S', 'M', 'L', 'XL', 'ONESIZE') NOT NULL;
