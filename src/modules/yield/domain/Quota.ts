import { v4 as uuidV4 } from "uuid";
import { QuotaErrors } from "./QuotaErrors";

class Quota {
  public id: string;

  public customerId: string;

  public value: number;

  public createdAt: Date;

  public updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  public validate() {
    this.customerId = this.customerId?.trim();
    
    if (!this.customerId) {
      throw new QuotaErrors.QuotaEmptyField("customerId");
    }

    if (!this.value) {
      throw new QuotaErrors.QuotaEmptyField("value");
    }

    if (this.value < 0) {
      throw new QuotaErrors.QuotaNegativeValue();
    }
  }
}

export { Quota };
