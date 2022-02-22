import { Role } from "@prisma/client";
import { IRolesRepository } from "../IRolesRepository";
import {v4 as uuidV4} from "uuid"

class RolesRepositoryInMemory implements IRolesRepository {
  private roles: Role[] = [];

  async findByName(name: string): Promise<Role> {
    const role = this.roles.find((r) => r.name === name);

    return role as Role;
  }

  async save(name: string) {
    let role = { id: uuidV4(), } as Role;

    Object.assign(role, { name });

    this.roles.push(role);

    return role;
  }
}

export { RolesRepositoryInMemory };
