import { CustomersRepositoryInMemory } from "@modules/customer/repositories/inMemory/CustomersRepositoryInMemory";
import { QuotasRepositoryInMemory } from "@modules/yield/repositories/inMemory/QuotaRepositoryInMemory";
import { FindQuotasErrors } from "./FindQuotasErrors";
import { FindQuotasUseCase } from "./FindQuotasUseCase";

let sut: FindQuotasUseCase;
let customersRepositoryInMemory: CustomersRepositoryInMemory;
let quotasRepositoryInMemory: QuotasRepositoryInMemory;
let customerOne;
let customerTwo;

describe("Find Quotas Use Case", () => {
  beforeEach(async () => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    quotasRepositoryInMemory = new QuotasRepositoryInMemory();
    sut = new FindQuotasUseCase(
      customersRepositoryInMemory,
      quotasRepositoryInMemory
    );

    customerOne = await customersRepositoryInMemory.save({
      name: "john1",
      email: "jhon@example.com",
      password: "123456",
      ownerId: '123'
    });

    customerTwo = await customersRepositoryInMemory.save({
      name: "john2",
      email: "example@jhon.com",
      password: "123456",
      ownerId: '123'
    });

    await quotasRepositoryInMemory.save({
      customerId: customerOne.id,
      value: 1000,
      customerOwnerId: '123'
    });

    await quotasRepositoryInMemory.save({
      customerId: customerOne.id,
      value: 1500,
      customerOwnerId: '123'
    });

    await quotasRepositoryInMemory.save({
      customerId: customerTwo.id,
      value: 1000,
      customerOwnerId: '321'
    });
  });

  afterEach(() => {
    quotasRepositoryInMemory = new QuotasRepositoryInMemory();
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
  });

  it("Should be able to get all quotas from customerId", async () => {
    const quotasOne = await sut.execute(customerOne.id);
    const quotasTwo = await sut.execute(customerTwo.id);

    expect(quotasOne.length).toBe(2);
    expect(quotasOne[0].customerId).toBe(customerOne.id);

    expect(quotasTwo.length).toBe(1);
    expect(quotasTwo[0].customerId).toBe(customerTwo.id);
  });

  it("Should be not able to get quotas from unexisting customer id ", async () => {
    try {
      await sut.execute("unexisting-id");
    } catch (error: any) {
      expect(error).toBeInstanceOf(FindQuotasErrors.CustomerNotFound);
      expect(error.message).toBe("Customer not found");
    }
  });
});
