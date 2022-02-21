import { AppError } from "@shared/errors/AppError";

export namespace CustomerErrors {
    export class CustomerInvalidEmailError extends AppError {
        constructor(email: string) {
            super(`Email ${email} is invalid.`, 400);
        }
    }

    export class CustomerInvalidField extends AppError {
        constructor(property: string, value: string) {
            super(`Property: ${property} with value ${value} is invalid.`, 400);
        }
    }
}