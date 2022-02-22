import {
  IRolesRepository,
  roles,
} from "@modules/customer/repositories/IRolesRepository";
import { Role } from "@prisma/client";
import { DBClient, IDBClient } from "@shared/infra/prisma";

class RolesRepository implements IRolesRepository {
  private repository: IDBClient;

  constructor() {
    this.repository = DBClient.instance;
  }

  async findByName(role: roles): Promise<Role> {
    const roleDB = await this.repository.role.findFirst({
      where: {
        name: role,
      },
    });

    return roleDB as Role;
  }

  async save(name: string): Promise<Role> {
    const role = await this.repository.role.create({
      data: {
        name,
      },
    });

    return role as Role;
  }
}

export { RolesRepository };
