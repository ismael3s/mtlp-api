import { AppError } from "@shared/errors/AppError";

export namespace QuotaErrors {
  export class QuotaEmptyField extends AppError {
    constructor(property: string) {
        super(`Quota field ${property} is empty`, 400);
    }
  }

  export class QuotaNegativeValue extends AppError {
      constructor() {
          super(`Quota value must be greater than 0`, 400);
      }
  }
}
