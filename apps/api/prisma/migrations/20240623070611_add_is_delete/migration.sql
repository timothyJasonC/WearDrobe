-- AlterTable
ALTER TABLE `product` ADD COLUMN `isDeleted` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `productvariant` ADD COLUMN `isDeleted` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `stockmutation` MODIFY `type` ENUM('TRANSFER', 'RESTOCK', 'REMOVE', 'TRANSACTION', 'INBOUND', 'DELETE') NOT NULL;
