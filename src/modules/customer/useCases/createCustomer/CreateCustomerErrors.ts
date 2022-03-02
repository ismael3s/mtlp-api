import { AppError } from "@shared/errors/AppError";

export namespace CreateCustomerErrors {
    export class CustomerAlreadyExistsError extends AppError {
        constructor(email: string) {
            super(`Customer with email ${email} already exists`);
        }
    }

    export class UnAuthorized extends AppError {
        constructor() {
            super(`UnAuthorized`);
        }
    }
}