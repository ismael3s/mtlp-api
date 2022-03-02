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

  static fromDb({ id, name, email, createdAt, updatedAt, role, owner }) {
    const customer = new Customer();

    Object.assign(customer, { id, name, email, createdAt, updatedAt, roles: role, owner });

    return customer;
  }
}
