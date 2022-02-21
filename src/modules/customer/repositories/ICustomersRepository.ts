import { Customer } from "../domain/Customer";
import { CreateCustomerDTO } from "../dtos/CreateCustomerDTO";

export interface ICustomersRepository {
    save(createCustomer: CreateCustomerDTO) : Promise<Customer>;
    findByEmail(email: string): Promise<Customer | undefined>;
    findById(id: string): Promise<Customer | undefined>;
}