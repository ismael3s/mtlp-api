import { CustomersRepositoryInMemory } from "@modules/customer/repositories/inMemory/CustomersRepositoryInMemory";
import { AuthenticateCustomerErrors } from "./AuthencicateCustomerErrors";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
}

class AuthenticateCustomerUseCase {
  constructor(
    private readonly customersRepository: CustomersRepositoryInMemory
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new AuthenticateCustomerErrors.CustomerNotFound();
    }

    if (!(await compare(password, customer.password))) {
      throw new AuthenticateCustomerErrors.CustomerNotFound();
    }

    const token = sign({ id: customer.id }, auth.secretKey, {
      expiresIn: auth.expiresIn,
    });


    return {
      customer: {
        email: customer.email,
        id: customer.id,
        name: customer.name,
      },
      token,
    };
  }
}

export { AuthenticateCustomerUseCase };
