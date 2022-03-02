import { app } from "@shared/infra/http/app";
import request from "supertest";
import { Connection } from "typeorm";
import createConnection from "@shared/infra/typeorm/";
import { sign } from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

const id = uuidV4();
const token = sign({ id }, process.env.JWT_SECRET_KEY, {
  expiresIn: "1d",
});

describe("Create Customer Contrller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    await connection.query(
      `INSERT INTO customer(id, name, email, password, role) VALUES ('${id}', 'John Doe', 'jho123n@example.com', '123', 'manager')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a customer ", async () => {
    const response = await request(app)
      .post("/api/manager/customers")
      .send({
        name: "John Doe",
        email: "jhon@example.com",
        password: "password",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.email).toBe("jhon@example.com");
    expect(response.body.name).toBe("John Doe");
  });

  it("Should not be able to create a customer when email already exists", async () => {
    const response = await request(app)
      .post("/api/manager/customers")
      .send({
        name: "John Doe",
        email: "jhon@example.com",
        password: "password",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Customer with email jhon@example.com already exists"
    );
  });

  it("Should not be able to create a customer with a empty password", async () => {
    const response = await request(app)
      .post("/api/manager/customers")
      .send({
        name: "John Doe",
        email: "test@example.com",
        password: "",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Property: password with value  is invalid."
    );
  });

  it("Should not be able to create a customer without being logged", async () => {
    const response = await request(app)
      .post("/api/manager/customers")
      .send({
        name: "John Doe",
        email: "test@example.com",
        password: "",
      })

    expect(response.status).toBe(401);
  });
});
