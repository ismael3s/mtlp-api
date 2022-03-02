import { CustomersRepositoryInMemory } from "@modules/customer/repositories/inMemory/CustomersRepositoryInMemory";
import { hash } from "bcrypt";
import { AuthenticateCustomerErrors } from "./AuthencicateCustomerErrors";
import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";

let sut: AuthenticateCustomerUseCase;
let customersRepositoryInMemory: CustomersRepositoryInMemory;

const payload = {
  email: "jhon@example.com",
  password: "password",
};

describe("Authenticate Customer Use Case", () => {
  beforeEach(async () => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    sut = new AuthenticateCustomerUseCase(customersRepositoryInMemory);

    const passwordHash = await hash(payload.password, 10);

    await customersRepositoryInMemory.save({
      ...payload,
      name: "John Doe",
      password: passwordHash,
      ownerId: "123",
    });
  });

  it("Should be able to generate a JWT for a customer", async () => {
    const result = await sut.execute(payload);

    expect(result).toHaveProperty("token");
    expect(result.customer).toHaveProperty("id");
    expect(result.customer).toHaveProperty("email", payload.email);
    expect(result.customer).toHaveProperty("name", "John Doe");
  });

  it("Should not be able to generate a JWT for a customer with unexisting email", async () => {
    await expect(async () => {
      await sut.execute({
        email: "asd@gmail.com",
        password: payload.password,
      });
    }).rejects.toBeInstanceOf(AuthenticateCustomerErrors.CustomerNotFound);
  });

  it("Should not be able to generate a JWT for a customer with invalid password", async () => {
   try {
      await sut.execute({ email: payload.email, password: "invalid" });
   } catch (error) {
    expect(error).toBeInstanceOf(AuthenticateCustomerErrors.CustomerNotFound);
   }
  });
});
