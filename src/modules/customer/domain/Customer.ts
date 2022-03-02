import { Validators } from "@utils/validators/Validators";
import { v4 as uuidV4 } from "uuid";
import { CustomerErrors } from "./CustomerErrors";

class Customer {
  public id: string;

  public name: string;

  public email: string;

  public password: string;

  public roles: string[];

  public owner: Customer[];

  public createdAt: Date;

  public updatedAt: Date;

  constructor() {

    if (!this.id) {
      this.id = uuidV4();
    }

    if (!this.roles) {
      this.roles = ["user"];
    }

  }

  public validate() {
    this.name = this.name.trim();
    this.email = this.email.trim();
    this.password = this.password.trim();

    if (Validators.isEmptyString(this.name)) {
      throw new CustomerErrors.CustomerInvalidField("name", this.name);
    }

    if (!Validators.isValidEmail(this.email)) {
        throw new CustomerErrors.CustomerInvalidEmailError(this.email);
    }

    if (Validators.isEmptyString(this.password)) {
      throw new CustomerErrors.CustomerInvalidField("password", this.password);
    }

  }
}

export { Customer };

