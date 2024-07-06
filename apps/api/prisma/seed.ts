import { PrismaClient } from "@prisma/client";
import { listUsers } from "./models/users";
import { listAdmin } from "./models/admin";
import { listWarehouse } from "./models/warehouse";
import { listProduct, listProductCategory, listProductImage, listProductVariant } from "./models/product";

const prisma = new PrismaClient();

async function main() {
    const users = await listUsers();
    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    });

    const admins = await listAdmin();
    await prisma.admin.createMany({
        data: admins,
        skipDuplicates: true
    });

    const warehouses = await listWarehouse();
    await prisma.warehouse.createMany({
        data: warehouses,
        skipDuplicates: true
    })

    // product
    const products = await listProduct();
    await prisma.product.createMany({
        data: products,
        skipDuplicates: true
    })

    const productVariants = await listProductVariant();
    await prisma.productVariant.createMany({
        data: productVariants,
        skipDuplicates: true
    })

    const productCategories = await listProductCategory();
    await prisma.productCategory.createMany({
        data: productCategories,
        skipDuplicates: true
    })

    const productImages = await listProductImage();
    await prisma.productImage.createMany({
        data: productImages,
        skipDuplicates: true
    })

    
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
