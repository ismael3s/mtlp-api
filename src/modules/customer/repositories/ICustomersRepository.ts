import { CreateCustomerDTO } from "../dtos/CreateCustomerDTO";
import { Customer } from "../infra/typeorm/entities/Customer";
export interface ICustomersRepository {
  save(createCustomer: CreateCustomerDTO): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  findAssocietedCustomers(customerId: string): Promise<Customer>;
}
