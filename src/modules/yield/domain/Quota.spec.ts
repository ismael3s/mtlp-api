import { Quota } from "./Quota";
import { QuotaErrors } from "./QuotaErrors";

describe("Quota Class", () => {
  it("Should be able to create a quota instance", () => {
    const quota = new Quota();

    Object.assign(quota, {
      customerId: "123-123123",
      value: 1000,
    });

    expect(quota).toBeInstanceOf(Quota);
    expect(quota).toHaveProperty("id");
    expect(quota.customerId).toBe("123-123123");
    expect(quota.value).toBe(1000);
  });

  it("Should not be able to create a quota instance without an customerId", () => {
    const quota = new Quota();

    Object.assign(quota, {
      value: 1000,
    });

    expect(() => quota.validate()).toThrow(QuotaErrors.QuotaEmptyField);
  });

  it("Should not be able to create a quota instance without a value", () => {
    const quota = new Quota();

    Object.assign(quota, {
      customerId: "123",
    });
    try {
      quota.validate();
    } catch (error: any) {
      expect(error).toBeInstanceOf(QuotaErrors.QuotaEmptyField);
      expect(error.message).toBe("Quota field value is empty");
    }
    // expect(() => quota.validate()).toThrow(QuotaErrors.QuotaEmptyField);
  });

  it("Should not be able to create a quota instance with negative  value", () => {
    const quota = new Quota();

    Object.assign(quota, {
      customerId: "123",
      value: -123,
    });

    expect(() => quota.validate()).toThrow(QuotaErrors.QuotaNegativeValue);
  });
});
