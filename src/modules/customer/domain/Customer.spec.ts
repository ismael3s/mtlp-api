import { CreateCustomerDTO } from "../dtos/CreateCustomerDTO";
import { Customer } from "./Customer";
import { CustomerErrors } from "./CustomerErrors";

const payload: CreateCustomerDTO = {
  name: "John Doe",
  email: "example@examplle.com",
  password: "password",
};

describe("Customer Domain Test", () => {
  it("Should be able to create an instannce of user", () => {
    const customer = new Customer();

    Object.assign(customer, payload);

    expect(customer).toBeInstanceOf(Customer);
    expect(customer).toHaveProperty("id");
    expect(customer).toHaveProperty("roles");
    expect(customer.roles).toEqual(["user"]);
  });

  it("Should not be able to create a instance of user with an invalid email", () => {
    const customer = new Customer();

    Object.assign(customer, {
      ...payload,
      email: "invalid-email",
    });
    expect(() => {
      customer.validate();
    }).toThrowError(CustomerErrors.CustomerInvalidEmailError);
  });

  it("Should not be able to create a instance of user with an empty name, email or password", () => {
    const customer = new Customer();

    Object.assign(customer, {
      name: "",
      password: "",
      email: "",
    });

    expect(() => {
      customer.validate();
    }).toThrowError(CustomerErrors.CustomerInvalidField);
  });
  it("Should not be able to create a instance of user with an empty password", () => {
    const customer = new Customer();

    Object.assign(customer, {
      name: "John Doe",
      password: "",
      email: "jhon@example.com",
    });

    try {
      customer.validate();
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomerErrors.CustomerInvalidField);
      expect(error.message).toBe("Property: password with value  is invalid.");
    }

    // expect(() => customer.validate()).toThrowError(
    //   CustomerErrors.CustomerInvalidField
    // );
  });
});
