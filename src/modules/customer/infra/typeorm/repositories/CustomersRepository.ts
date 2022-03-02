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


    if (createCustomer.ownerId) {
      const owner = await this.findById(createCustomer.ownerId);

      customer.associated = [owner];
    }
    
    await this.repository.save(customer);

    return customer;
  }

  findByEmail(email: string): Promise<Customer> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<Customer> {
    const customer = await  this.repository.findOne({ id });
    
    return customer;
  }

  async findAssocietedCustomers(customerId: string): Promise<Customer> {
    const query = this.repository.createQueryBuilder("customer");

    return query
      .leftJoinAndSelect("customer.owner", "owner")
      .andWhere("customer.id = :customerId", { customerId })
      .getOne();
  }
}

export { CustomersRepository };
