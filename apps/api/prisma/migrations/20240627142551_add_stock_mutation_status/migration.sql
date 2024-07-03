-- AlterTable
ALTER TABLE `stockmutation` ADD COLUMN `status` ENUM('WAITING', 'ACCEPTED', 'REJECTED') NULL;
