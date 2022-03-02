import auth from "@config/auth";
import { sign } from "jsonwebtoken";
import { Connection } from "typeorm";

class TestHelpers {
  static async createManager(
    connection: Connection,
    id: string,
    email?: string
  ) {
    await connection.query(
      `INSERT INTO customer(id, name, email, password, role) VALUES ('${id}', 'John Doe', '${
        email ?? "jho123n@example.com"
      }', '123', 'manager')`
    );

    return id;
  }

  static async createCustomer(
    connection: Connection,
    id: string,
    email?: string
  ) {
    await connection.query(
      `INSERT INTO customer(id, name, email, password, role) VALUES ('${id}', 'John Doe', '${
        email ?? "jho123n@example.com"
      }', '123', 'user')`
    );

    return id;
  }

  static generateJWT(id: string): string {
    const token = sign({ id }, auth.secretKey, {
      expiresIn: auth.expiresIn,
    });

    return token;
  }
}

export { TestHelpers };
