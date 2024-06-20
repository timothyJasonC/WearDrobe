/*
  Warnings:

  - You are about to drop the column `size` on the `stockmutationitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `stockmutationitem` DROP COLUMN `size`;
