import { PrismaClient, ProductTypes } from "@prisma/client";
import { ProductGender } from "prisma/types";
import { v4 as uuid } from "uuid";
import { listUsers } from "./models/users";
import { listAdmin } from "./models/admin";
import { listProduct } from "./models/product";

const prisma = new PrismaClient()

async function main() {
    const users = await listUsers();
    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    })

    const admin = await listAdmin();
    await prisma.admin.createMany({
        data: admin,
        skipDuplicates: true
    })

    const product = await listProduct();
    

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
