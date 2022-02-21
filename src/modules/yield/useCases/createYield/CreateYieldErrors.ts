import { AppError } from "@shared/errors/AppError";

export namespace CreateYieldErrors {
    export class QuotaNotFound extends AppError {
        constructor() {
            super(`Quota not found`, 400);
        }
    }
}   