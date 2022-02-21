import { Customer } from "@modules/customer/domain/Customer";
import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { CreateCustomerErrors } from "./CreateCustomerErrors";
import { hash } from "bcrypt";

class CreateCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}
  async execute({
    email,
    name,
    password,
  }: CreateCustomerDTO): Promise<Customer> {
    const customerAlreadyExists = await this.customersRepository.findByEmail(
      email
    );

    if (customerAlreadyExists) {
      throw new CreateCustomerErrors.CustomerAlreadyExistsError(email);
    }

    const passwordHash = await hash(password, 10);

    const customer = await this.customersRepository.save({
      name,
      email,
      password: passwordHash,
    });

    return customer;
  }
}

export { CreateCustomerUseCase };
