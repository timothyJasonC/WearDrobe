/*
  Warnings:

  - Added the required column `size` to the `StockMutation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockmutation` ADD COLUMN `size` ENUM('S', 'M', 'L', 'XL', 'ONESIZE') NOT NULL;
