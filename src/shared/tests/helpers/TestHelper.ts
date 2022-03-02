import auth from "@config/auth";
import { CreateQuotaDTO } from "@modules/yield/dtos/CreateQuotaDTO";
import { sign } from "jsonwebtoken";
import { Connection } from "typeorm";

class TestHelpers {
  public static async createManager(
    connection: Connection,
    id: string,
    email?: string
  ) {
    await connection.query(
      `INSERT INTO customer(id, name, email, password, role) VALUES ('${id}', 'John Doe', '${
        email ?? "manager@example.com"
      }', '123', 'manager')`
    );

    return id;
  }

  public static async createCustomer(
    connection: Connection,
    id: string,
    email?: string
  ) {
    await connection.query(
      `INSERT INTO customer(id, name, email, password, role) VALUES ('${id}', 'John Doe', '${
        email ?? "user@example.com"
      }', '123', 'user')`
    );

    return id;
  }

  public static async createQuota(
    connection: Connection,
    { id, managerId, customerId, value }: CreateQuotaDTO & { id: string }
  ) {
    await connection.query(
      `INSERT INTO quota(id, manager_id, customer_id, value) VALUES ('${id}', '${managerId}', '${customerId}', ${value})`
    );
  }

   static generateJWT(id: string): string {
    const token = sign({ id }, auth.secretKey, {
      expiresIn: auth.expiresIn,
    });

    return token;
  }
}

export { TestHelpers };
