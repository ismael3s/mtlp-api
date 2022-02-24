import { Customer } from "@modules/customer/domain/Customer";
import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { CustomerMap } from "@modules/customer/mappers/CustomerMap";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { CreateCustomerErrors } from "./CreateCustomerErrors";

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute({ email, name, password }: CreateCustomerDTO) {
    const customerAlreadyExists = await this.customersRepository.findByEmail(
      email
    );

    if (customerAlreadyExists) {
      throw new CreateCustomerErrors.CustomerAlreadyExistsError(email);
    }

    const customer = new Customer();

    Object.assign(customer, { email, name, password });

    customer.validate();

    const passwordHash = await hash(password, 10);

    const customerDb = await this.customersRepository.save({
      id: customer.id,
      name,
      email,
      password: passwordHash,
      role: "user",
    });

    Object.assign(customer, customerDb);


    return CustomerMap.toDTO(customer);
  }
}

export { CreateCustomerUseCase };

