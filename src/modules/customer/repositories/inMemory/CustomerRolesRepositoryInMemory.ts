import { CustomerRole } from "@prisma/client";
import { ICustomerRolesRepository } from "../ICustomerRolesRepository";

class CustomerRolesRepositoryInMemory implements ICustomerRolesRepository {
  private customerRoles: CustomerRole[] = [];

  async save(customerId: string, roleId: string): Promise<void> {
    let customerRole = {} as CustomerRole;

    Object.assign(customerRole, { customerId, roleId });

    this.customerRoles.push(customerRole);
  }

  async findCustomerRoles(customerId: string) {
    const customerRoles = this.customerRoles.filter(
      (customerRole) => customerRole.customer_id === customerId
    );

    return customerRoles;
  }
}

export { CustomerRolesRepositoryInMemory };
