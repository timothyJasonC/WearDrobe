/*
  Warnings:

  - Added the required column `labelAddress` to the `AddressList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelAddress` to the `Warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AddressList` ADD COLUMN `labelAddress` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Warehouse` ADD COLUMN `labelAddress` VARCHAR(191) NOT NULL;
