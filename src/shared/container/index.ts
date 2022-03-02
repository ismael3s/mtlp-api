import { CustomersRepository } from "@modules/customer/infra/typeorm/repositories/CustomersRepository";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { QuotasRepository } from "@modules/yield/infra/typeorm/repositories/QuotasRepository";
import { IQuotasRepository } from "@modules/yield/repositories/IQuotasRepository";
import { container } from "tsyringe";


container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);


container.registerSingleton<IQuotasRepository>("QuotasRepository", QuotasRepository);