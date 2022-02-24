class CreateCustomerDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: Role
}

type Role =  "user" | "manager" | "admin";


export { CreateCustomerDTO };