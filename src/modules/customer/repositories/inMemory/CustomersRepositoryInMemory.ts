import { Customer } from "@modules/customer/domain/Customer";
import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { ICustomersRepository } from "../ICustomersRepository";

class CustomersRepositoryInMemory implements ICustomersRepository {
  private customers: Customer[] = [];

  async save({ name, email, password }: CreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { name, email, password });

    customer.validate();

    this.customers.push(customer);

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(
      (customer) => customer.email === email
    );

    return customer;
  }

  async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find((customer) => customer.id === id);

    return customer;
  }
}

export { CustomersRepositoryInMemory };
