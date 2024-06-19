/*
  Warnings:

  - Added the required column `type` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HEX` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productimage` ADD COLUMN `type` ENUM('MAIN', 'OTHER') NOT NULL;

-- AlterTable
ALTER TABLE `productvariant` ADD COLUMN `HEX` VARCHAR(191) NOT NULL;
