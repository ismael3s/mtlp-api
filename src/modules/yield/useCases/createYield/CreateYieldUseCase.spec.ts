import { Yield } from "@modules/yield/domain/Yield";
import { QuotasRepositoryInMemory } from "@modules/yield/repositories/inMemory/QuotaRepositoryInMemory";
import { YieldsRepositoryInMemory } from "@modules/yield/repositories/inMemory/YieldsRepositoryInMemory";
import { CreateYieldErrors } from "./CreateYieldErrors";
import { CreateYieldUseCase } from "./CreateYieldUseCase";

let sut: CreateYieldUseCase;
let yieldsRepositoryInMemory: YieldsRepositoryInMemory;
let quotasRepositoryInMemory: QuotasRepositoryInMemory;

describe("Create Yield Use Case", () => {
  beforeEach(() => {
    yieldsRepositoryInMemory = new YieldsRepositoryInMemory();
    quotasRepositoryInMemory = new QuotasRepositoryInMemory();
    sut = new CreateYieldUseCase(
      quotasRepositoryInMemory,
      yieldsRepositoryInMemory
    );
  });

  it("Should be able to create a yield", async () => {
    const quota = await quotasRepositoryInMemory.save({
      customerId: "customerId",
      value: 1000,
      managerId: "123"
    });

    const yeild_ = await sut.execute(quota.id, 0.3);

    expect(yeild_).toBeInstanceOf(Yield);
    expect(yeild_).toHaveProperty("id");
    expect(yeild_.quotaId).toBe(quota.id);
    expect(yeild_.percentage).toBe(0.3);
  });

  it("Should not be able to create a yield for a unexisting quota", async () => {
    try {
      await sut.execute("123", 0.3);
    } catch (error) {
      expect(error).toBeInstanceOf(CreateYieldErrors.QuotaNotFound);
    }
  });
});
