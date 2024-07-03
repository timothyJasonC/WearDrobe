/*
  Warnings:

  - A unique constraint covering the columns `[warehouseName]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Warehouse_warehouseName_key` ON `Warehouse`(`warehouseName`);
