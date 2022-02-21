import { CustomersRepositoryInMemory } from "@modules/customer/repositories/inMemory/CustomersRepositoryInMemory";
import { CreateCustomerUseCase } from "../createCustomer/CreateCustomerUseCase";
import { AuthenticateCustomerErrors } from "./AuthencicateCustomerErrors";
import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";

let sut: AuthenticateCustomerUseCase;
let customersRepositoryInMemory: CustomersRepositoryInMemory;
let createCustomerUseCase: CreateCustomerUseCase;

const payload = {
  email: "jhon@example.com",
  password: "password",
};

describe("Authenticate Customer Use Case", () => {
  beforeEach(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    createCustomerUseCase = new CreateCustomerUseCase(
      customersRepositoryInMemory
    );
    sut = new AuthenticateCustomerUseCase(customersRepositoryInMemory);
  });

  it("Should be able to generate a JWT for a customer", async () => {
    await createCustomerUseCase.execute({
      ...payload,
      name: "John Doe",
    });

    const result = await sut.execute(payload);

    expect(result).toHaveProperty("token");
    expect(result.customer).toHaveProperty("id");
    expect(result.customer).toHaveProperty("email", payload.email);
    expect(result.customer).toHaveProperty("name", "John Doe");
  });

  it("Should not be able to generate a JWT for a customer with unexisting email", async () => {
    await expect(async () => {
      await sut.execute(payload);
    }).rejects.toBeInstanceOf(AuthenticateCustomerErrors.CustomerNotFound);
  });

  it("Should not be able to generate a JWT for a customer with invalid password", async () => {
    await createCustomerUseCase.execute({
        ...payload,
        name: "John Doe",
        password: '123'
    })

    await expect(async () => {
      await sut.execute(payload);
    }).rejects.toBeInstanceOf(AuthenticateCustomerErrors.CustomerNotFound);
  });
});
