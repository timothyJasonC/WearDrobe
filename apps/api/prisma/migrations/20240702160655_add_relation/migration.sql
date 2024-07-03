-- AlterTable
ALTER TABLE `stockmutation` ADD COLUMN `warehouseId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `StockMutation` ADD CONSTRAINT `StockMutation_associatedWarehouseID_fkey` FOREIGN KEY (`associatedWarehouseID`) REFERENCES `Warehouse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
