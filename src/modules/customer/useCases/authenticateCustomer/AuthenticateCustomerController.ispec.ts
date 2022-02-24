import { app } from "@shared/infra/http/app";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import request from "supertest";
import { Connection  } from "typeorm";
import createConnection from "@shared/infra/typeorm/";

let connection: Connection;

describe("Authenticate Customer Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("password", 10);
    
    await connection.query(`INSERT INTO customer (id, name, email, password, role) VALUES ('${id}', 'John Doe', 'jhon@example.com', '${password}', 'user')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to genrate a JWT when is a valid data", async () => {
    const response = await request(app).post("/api/sessions").send({
      email: "jhon@example.com",
      password: "password",
    });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.customer).toHaveProperty("email", "jhon@example.com");
  });

  it("Should not be able to genrate a JWT when is a invalid data", async () => {
    const response = await request(app).post("/api/sessions").send({
      email: "123@example.com",
      password: "password123",
    });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Customer not found");
  });
});
