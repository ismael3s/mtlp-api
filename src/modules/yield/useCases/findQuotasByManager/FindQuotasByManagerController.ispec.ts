import auth from "@config/auth";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { TestHelpers } from "@shared/tests/helpers/TestHelper";
import { sign } from "jsonwebtoken";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;
let managerId: string;
let customerId: string;
let token;

describe("Find Quotas By manager controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    [managerId, customerId] = await Promise.all([
      await TestHelpers.createManager(connection, uuidV4()),
      await TestHelpers.createCustomer(connection, uuidV4()),
    ]);

    await Promise.all([
      TestHelpers.createQuota(connection, {
        customerId,
        managerId,
        value: 1000,
        id: uuidV4(),
      }),
      TestHelpers.createQuota(connection, {
        customerId,
        managerId,
        value: 1000,
        id: uuidV4(),
      }),
     
    ]);

    token = TestHelpers.generateJWT(managerId);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to find quotas by manager", async () => {
    const response = await request(app)
      .get("/api/manager/quotas")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].managerId).toBe(managerId);
  });

  it("should not be able to find quotas if manager is not authenticated", async () => {
    const response = await request(app)
      .get("/api/manager/quotas")

    expect(response.status).toBe(401);
  });
});
