import { Customer } from "../domain/Customer";

export class CustomerMap {
  static toDTO({ id, name, email, createdAt }: Customer) {
    return {
      id,
      name,
      email,
      createdAt,
    };
  }
}
