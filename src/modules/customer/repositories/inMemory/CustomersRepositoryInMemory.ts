import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { Customer } from "@prisma/client";
import { ICustomersRepository } from "../ICustomersRepository";
import { v4 as uuidV4 } from "uuid";
class CustomersRepositoryInMemory implements ICustomersRepository {
  private customers: Customer[] = [];

  async save({ name, email, password }: CreateCustomerDTO): Promise<Customer> {
    let customer = { id: uuidV4() } as Customer;

    Object.assign(customer, { name, email, password });

    this.customers.push(customer);

    return customer;
  }

  async findByEmail(email: string) {
    const customer = this.customers.find(
      (customer) => customer.email === email
    );

    return customer as Customer;
  }

  async findById(id: string) {
    const customer = this.customers.find((customer) => customer.id === id);

    return customer as Customer;
  }
}

export { CustomersRepositoryInMemory };
