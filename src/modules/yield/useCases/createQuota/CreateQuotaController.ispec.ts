import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { TestHelpers } from "@shared/tests/helpers/TestHelper";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 } from "uuid";

let connection: Connection;
let customerId: string;
let managerId: string;
let token: string;

describe("Create Quota Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    managerId = await TestHelpers.createManager(
      connection,
      v4(),
      "manager@email.com"
    );

    customerId = await TestHelpers.createCustomer(
      connection,
      v4(),
      "customer@email.com"
    );

    token = TestHelpers.generateJWT(managerId);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a quota", async () => {
    const response = await request(app)
      .post("/api/manager/quotas")
      .send({
        customerId: customerId,
        value: 1000,
      })
      .set("Authorization", `Bearer ${token}`);

      expect(response.body.id).toBeDefined();
      expect(response.body.customerId).toBe(customerId);
      expect(response.body.managerId).toBe(managerId);
      expect(response.status).toBe(201);
  });

  it("Should not be able to create a quota if the user is not a manager", async () => {
    const response = await request(app)
      .post("/api/manager/quotas")
      .send({
        customerId: customerId,
        value: 1000,
      })
      .set("Authorization", `Bearer ${TestHelpers.generateJWT(customerId)}`);

    expect(response.status).toBe(401);
  })

  it("Should not be able to create a quota for a unexisting user", async () => {
    const response = await request(app)
      .post("/api/manager/quotas")
      .send({
        customerId: v4(),
        value: 1000,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Customer not found");
  })

  it("Should not be able to create a quota with negative value", async () => {
    const response = await request(app)
      .post("/api/manager/quotas")
      .send({
        customerId,
        value: -1000,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Quota value must be greater than 0");
  })
});
