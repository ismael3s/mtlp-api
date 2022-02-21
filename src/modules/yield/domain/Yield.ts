import { v4 as uuidV4 } from "uuid";
import { YieldErrors } from "./YieldErrors";

class Yield {
  public id: string;

  public quotaId: string;

  public percentage: number;

  public createdAt: Date;

  public updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    this.percentage = 0;
  }

  public validate() {
    if (!this.quotaId) {
      throw new YieldErrors.QuotaIdEmpty();
    }
  }
}

export { Yield };
