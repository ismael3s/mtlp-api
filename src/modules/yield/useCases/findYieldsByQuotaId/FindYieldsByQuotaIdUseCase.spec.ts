import { YieldsRepositoryInMemory } from "@modules/yield/repositories/inMemory/YieldsRepositoryInMemory";
import { FindYieldsByQuotaIdUseCase } from "./FindYieldsByQuotaIdUseCase";

let sut: FindYieldsByQuotaIdUseCase;
let yieldsRepositoryInMemory: YieldsRepositoryInMemory;

describe("Find Yields By Quota ID Use Case", () => {
  beforeEach(async () => {
    yieldsRepositoryInMemory = new YieldsRepositoryInMemory();
    sut = new FindYieldsByQuotaIdUseCase(yieldsRepositoryInMemory);
  });

  it("Should be able to find all yeilds from a quota id", async () => {
    await yieldsRepositoryInMemory.save({
      quotaId: "123",
      percentage: 0.5,
    });

    const yield_ = await sut.execute("123");

    expect(yield_).toBeInstanceOf(Array);
    expect(yield_).toHaveLength(1);
  });
});
