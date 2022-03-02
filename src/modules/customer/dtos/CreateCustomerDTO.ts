class CreateCustomerDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: Role
  ownerId: string;
  ownerRole?: string;
}

export type Role =  "user" | "manager" | "admin";


export { CreateCustomerDTO };