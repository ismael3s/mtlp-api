import { CustomerRolesRepository } from "@modules/customer/infra/prisma/repositories/CustomerRolesRepository";
import { CustomersRepository } from "@modules/customer/infra/prisma/repositories/CustomersRepository";
import { RolesRepository } from "@modules/customer/infra/prisma/repositories/RolesRepository";
import { ICustomerRolesRepository } from "@modules/customer/repositories/ICustomerRolesRepository";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { IRolesRepository } from "@modules/customer/repositories/IRolesRepository";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

container.registerSingleton("PrismaClient", PrismaClient);

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);

container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository
);

container.registerSingleton<ICustomerRolesRepository>(
  "CustomerRolesRepository",
  CustomerRolesRepository
);
