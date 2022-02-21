import { AppError } from "@shared/errors/AppError";

export namespace FindQuotasErrors {
    export class CustomerNotFound extends AppError {
        constructor() {
            super(`Customer not found`, 400);
        }
    }
}