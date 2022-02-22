


interface ICustomerRolesRepository {
  save(customerId: string, roleId: string): Promise<void>;
  findCustomerRoles(customerId: string): Promise<any>;
}

export { ICustomerRolesRepository };

