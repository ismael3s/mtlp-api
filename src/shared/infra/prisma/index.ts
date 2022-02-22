import { PrismaClient } from "@prisma/client";

const DBClient = {
  instance: new PrismaClient(),
};

export type IDBClient = typeof DBClient.instance;

Object.freeze(DBClient);

export { DBClient };
