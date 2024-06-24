/*
  Warnings:

  - You are about to drop the column `variantUpdatedAt` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `variantUpdatedAt`,
    ADD COLUMN `stockUpdatedAt` DATETIME(3) NULL;
