import { PrismaClient } from "@prisma/client";
import { listUsers } from "./models/users";
import { listAdmin } from "./models/admin";

const prisma = new PrismaClient();

async function main() {
  const users = await listUsers();
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  });

  const admin = await listAdmin();
  await prisma.admin.createMany({
    data: admin,
    skipDuplicates: true
  });
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
