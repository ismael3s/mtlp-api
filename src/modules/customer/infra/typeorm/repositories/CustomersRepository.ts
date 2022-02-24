import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { Customer } from "../entities/Customer";

@EntityRepository(Customer)
class CustomersRepository implements ICustomersRepository {
  repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  async save(createCustomer: CreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create(createCustomer);

    await this.repository.save(customer);

    return customer;
  }

  findByEmail(email: string): Promise<Customer> {
    return this.repository.findOne({ email });
  }
  
  findById(id: string): Promise<Customer> {
    return this.repository.findOne({ id });
  }
}

export { CustomersRepository };
