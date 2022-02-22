import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seeder() {
  try {
    await Promise.all([
      prisma.role.upsert({
        create: {
          name: "manager",
        },
        where: { name: "manager", },
        update: {},
      }),

      prisma.role.upsert({
        create: {
          name: "user",
        },
        where: { name: "user" },
        update: {},
      }),
      
      prisma.role.upsert({
        create: {
          name: "admin",
        },
        where: { name: "admin" },
        update: {},
      }),
    ]);
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}


seeder();