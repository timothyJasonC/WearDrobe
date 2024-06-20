/*
  Warnings:

  - Added the required column `city_id` to the `AddressList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_name` to the `AddressList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `AddressList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `AddressList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `AddressList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `AddressList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresslist` ADD COLUMN `city_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `city_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `postal_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `province_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
