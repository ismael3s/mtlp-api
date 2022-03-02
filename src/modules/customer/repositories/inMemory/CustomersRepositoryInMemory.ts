import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { ICustomersRepository } from "../ICustomersRepository";
import { v4 as uuidV4 } from "uuid";
import { Customer } from "@modules/customer/infra/typeorm/entities/Customer";
class CustomersRepositoryInMemory implements ICustomersRepository {
  findAssocietedCustomers(customerId: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
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
