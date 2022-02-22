import { ICustomerRolesRepository } from "@modules/customer/repositories/ICustomerRolesRepository";
import { DBClient, IDBClient } from "@shared/infra/prisma";

class CustomerRolesRepository implements ICustomerRolesRepository {
  private repository: IDBClient;

  constructor() {
    this.repository = DBClient.instance;
  }

  async save(customerId: string, roleId: string): Promise<void> {
    await this.repository.customerRole.create({
      data: {
        customer_id: customerId,
        role_id: roleId,
      },
    });
  }

  async findCustomerRoles(customerId: string): Promise<any> {
    const customerRoles = await this.repository.customerRole.findMany({
      where: {
        customer_id: customerId,
      },
      include: {
        role: true,
      },
    });

    return customerRoles;
  }
}

export { CustomerRolesRepository };
