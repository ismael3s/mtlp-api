import { CreateCustomerDTO } from "../dtos/CreateCustomerDTO";
import { Customer, CustomerRole } from "@prisma/client";
export interface ICustomersRepository {
  save(createCustomer: CreateCustomerDTO): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  findById(id: string): Promise<Customer>;
}
