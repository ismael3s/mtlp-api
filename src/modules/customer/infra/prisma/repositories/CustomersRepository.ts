import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { Customer } from "@prisma/client";
import { DBClient, IDBClient } from "@shared/infra/prisma";

class CustomersRepository implements ICustomersRepository {
  repository: IDBClient;

  constructor() {
    this.repository = DBClient.instance;
  }

  async save({
    id,
    email,
    name,
    password,
  }: CreateCustomerDTO): Promise<Customer> {
    const customer = await this.repository.customer.create({
      data: {
        id: id as string,
        email,
        name,
        password,
      },
    });

    return customer;
  }
  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.repository.customer.findFirst({
      where: { email },
    });

    return customer as Customer;
  }
  async findById(id: string) {
    const customer = await this.repository.customer.findUnique({
      where: { id },
    });

    return customer as Customer;
  }
}

export { CustomersRepository };
