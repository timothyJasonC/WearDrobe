/*
  Warnings:

  - The values [MAIN,OTHER] on the enum `ProductImage_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `productimage` MODIFY `type` ENUM('THUMBNAIL', 'ADDITIONAL') NOT NULL;
