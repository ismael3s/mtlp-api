import { AppError } from "@shared/errors/AppError";

export namespace YieldErrors {
    export class QuotaIdEmpty extends AppError {
        constructor() {
            super(`Quota id is empty`, 400);
        }
    }
}