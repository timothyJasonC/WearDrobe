/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentProof` on the `order` table. All the data in the column will be lost.
  - The values [WAITING_CONFIRMATION] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `paymentMethod`,
    DROP COLUMN `paymentProof`,
    MODIFY `status` ENUM('CART', 'PENDING_PAYMENT', 'PROCESSED', 'SHIPPED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'CART';
