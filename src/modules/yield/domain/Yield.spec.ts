import { Yield } from "./Yield";
import { YieldErrors } from "./YieldErrors";

describe("Yield Class", () => {
  it("Should be able to create a yield class", () => {
    const yield_ = new Yield();

    Object.assign(yield_, {
      quotaId: "123-123123",
      percentage: 0.5,
    });

    expect(yield_).toBeInstanceOf(Yield);
    expect(yield_).toHaveProperty("id");
    expect(yield_.quotaId).toBe("123-123123");
    expect(yield_.percentage).toBe(0.5);
  });

  it("Yield instance be default percentage should be 0", () => {
    const yield_ = new Yield();

    Object.assign(yield_, {
      quotaId: "123-123123",
    });

    expect(yield_.percentage).toBe(0);
  })

  it("Should not be able to validate a yield instance without a quotaId", () => {
    const yield_ = new Yield();

    Object.assign(yield_, {
      quotaId: "",
      percentage: 0.5,
    });

    expect(() => yield_.validate()).toThrowError(YieldErrors.QuotaIdEmpty);
  });
});
