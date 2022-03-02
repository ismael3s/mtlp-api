import { CustomersRepositoryInMemory } from "@modules/customer/repositories/inMemory/CustomersRepositoryInMemory";
import { QuotasRepositoryInMemory } from "@modules/yield/repositories/inMemory/QuotaRepositoryInMemory";
import { FindQuotasErrors } from "./FindQuotasByManagerErrors";
import { FindQuotasByManagerUseCase } from "./FindQuotasByManagerUseCase";

let sut: FindQuotasByManagerUseCase;
let customersRepositoryInMemory: CustomersRepositoryInMemory;
let quotasRepositoryInMemory: QuotasRepositoryInMemory;
let customerOne;
let customerTwo;
let manager;

describe("Find Quotas Use Case", () => {
  beforeEach(async () => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    quotasRepositoryInMemory = new QuotasRepositoryInMemory();
    sut = new FindQuotasByManagerUseCase(
      customersRepositoryInMemory,
      quotasRepositoryInMemory
    );


    manager = await customersRepositoryInMemory.save({
      email: "manager@example.com",
      name: "Manager",
      ownerId: "",
      password: "1234",
    });
    
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
      managerId: manager.id
    });

    await quotasRepositoryInMemory.save({
      customerId: customerOne.id,
      value: 1500,
      managerId: manager.id
    });

    await quotasRepositoryInMemory.save({
      customerId: customerTwo.id,
      value: 1000,
      managerId: '321'
    });
  });

  afterEach(() => {
    quotasRepositoryInMemory = new QuotasRepositoryInMemory();
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
  });

  it("Should be able to get all quotas from a manager", async () => {
    const quotas = await sut.execute(manager.id);

    expect(quotas.length).toBe(2);
    expect(quotas[0].customerId).toBe(customerOne.id);
    expect(quotas[0].managerId).toBe(manager.id);

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
