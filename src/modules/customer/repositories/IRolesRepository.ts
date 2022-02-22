import { Role } from "@prisma/client";

export type roles = "manger" | "admin" | "user";

interface IRolesRepository {
  findByName(name: string): Promise<Role>;
  save(name: string): Promise<Role>
}

export { IRolesRepository };
