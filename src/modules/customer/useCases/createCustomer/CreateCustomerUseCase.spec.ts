import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { CustomersRepositoryInMemory } from "@modules/customer/repositories/inMemory/CustomersRepositoryInMemory";
import { CreateCustomerErrors } from "./CreateCustomerErrors";
import { CustomerErrors } from "@modules/customer/domain/CustomerErrors";

let sut: CreateCustomerUseCase;
let customersRepositoryInMemory: ICustomersRepository;

const payload: CreateCustomerDTO = {
  name: "John Doe",
  password: "password",
  email: "john@example.com",
};

describe("Create Customer Use Case", () => {
  beforeEach(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    sut = new CreateCustomerUseCase(customersRepositoryInMemory);
  });

  it("Should be able to create a customer", async () => {
    const customer = await sut.execute(payload);

    expect(customer).toHaveProperty("id");
    expect(customer).toHaveProperty("name", payload.name);
    expect(customer).toHaveProperty("email", payload.email);
  });

  it("Should not be able to create a customer with a duplicated email", async () => {
    await sut.execute(payload);

    await expect(async () => {
      await sut.execute({
        ...payload,
        name: "Doe John",
      });
    }).rejects.toThrow(CreateCustomerErrors.CustomerAlreadyExistsError);
  });

  it("Should not be able to create a customer with a invalid data", async () => {
    await expect(async () => {
      await sut.execute({
        name: "",
        email: "123@123.com",
        password: "",
      });
    }).rejects.toBeInstanceOf(CustomerErrors.CustomerInvalidField);
  });

  it("Should not be able to create a customer with a invalid data", async () => {
    await expect(async () => {
      await sut.execute({
        name: "Jgon",
        email: "123@12@3.com",
        password: "12245",
      });
    }).rejects.toBeInstanceOf(CustomerErrors.CustomerInvalidEmailError);
  });
});
