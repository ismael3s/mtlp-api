import { CustomersRepositoryInMemory } from "@modules/customer/repositories/inMemory/CustomersRepositoryInMemory";
import { Quota } from "../../domain/Quota";
import { QuotaErrors } from "../../domain/QuotaErrors";
import { QuotasRepositoryInMemory } from "../../repositories/inMemory/QuotaRepositoryInMemory";
import { CreateQuotaErrors } from "./CreateQuotaErrors";
import { CreateQuotaUseCase } from "./CreateQuotaUseCase";

let sut: CreateQuotaUseCase;
let customersRepositoryInMemory: CustomersRepositoryInMemory;
let quotaRepositoryInMemory: QuotasRepositoryInMemory;

describe("Create Quota Use Case", () => {
  beforeEach(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    quotaRepositoryInMemory = new QuotasRepositoryInMemory();
    sut = new CreateQuotaUseCase(
      quotaRepositoryInMemory,
      customersRepositoryInMemory
    );
  });

  it("Should be able to create a quota", async () => {
    const customer = await customersRepositoryInMemory.save({
      name: "John Doe",
      email: "jhon1@example.com",
      password: "123456",
      ownerId: "123"
    });
    const quota = await sut.execute({ customerId: customer.id, value: 1000,customerOwnerId: '123' });

    expect(quota).toBeInstanceOf(Quota);
    expect(quota).toHaveProperty("id");
    expect(quota.customerId).toBe(customer.id);
    expect(quota.value).toBe(1000);
  });

  it("Should not be able to create a quota for an invalid customerId ", async () => {
    try {
      await sut.execute({ customerId: "123-123123", value: 1000, customerOwnerId: '123' });
    } catch (error) {
      expect(error).toBeInstanceOf(CreateQuotaErrors.CustomerNotFound);
    }
  });

  it("Should not be able to create a quota with empty customerId", async () => {
    try {
      const customer = await customersRepositoryInMemory.save({
        name: "John Doe",
        email: "example@example.com",
        password: "123456",
        ownerId: "123-123123",
      });

      await sut.execute({ customerId: customer.id, value: -123, customerOwnerId: '123' });
    } catch (error) {
      expect(error).toBeInstanceOf(QuotaErrors.QuotaNegativeValue);
    }
  });
});
