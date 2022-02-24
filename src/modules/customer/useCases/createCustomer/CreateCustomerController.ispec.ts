import { app } from "@shared/infra/http/app";
import request from "supertest";
import { Connection } from "typeorm";
import createConnection from "@shared/infra/typeorm/";

let connection: Connection;

describe("Create Customer Contrller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations()
  });
  
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a customer ", async () => {
    const response = await request(app).post("/api/customers").send({
      name: "John Doe",
      email: "jhon@example.com",
      password: "password",
    });

    expect(response.body.email).toBe("jhon@example.com");
    expect(response.body.name).toBe("John Doe");
    expect(response.status).toBe(201);
  });

  it("Should be able to create a customer when email already exists", async () => {
    const response = await request(app).post("/api/customers").send({
      name: "John Doe",
      email: "jhon@example.com",
      password: "password",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Customer with email jhon@example.com already exists"
    );
  });

  it("Should not be able to create a customer with a empty password", async () => {
    const response = await request(app).post("/api/customers").send({
      name: "John Doe",
      email: "test@example.com",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Property: password with value  is invalid.");
  });
});
