import { Connection } from "typeorm";
import createConnection from "@shared/infra/typeorm/";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import request from "supertest";
import { app } from "@shared/infra/http/app";
import { sign } from "jsonwebtoken";

let connection: Connection;

const ids = [uuidV4(), uuidV4(), uuidV4()];
const token = sign({ id: ids[1] }, process.env.JWT_SECRET_KEY, {
  expiresIn: "1d",
});
describe("Find Associated customer Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const password = await hash("password", 10);

    await Promise.all([
      connection.query(
        `INSERT INTO customer(id, name, email, password, role) VALUES ('${ids[0]}', 'John Doe', 'jhon@example.com', '${password}', 'user')`
      ),
      connection.query(
        `INSERT INTO customer(id, name, email, password, role) VALUES ('${ids[2]}', 'John Doe', 'jho123n@example.com', '${password}', 'user')`
      ),
      connection.query(
        `INSERT INTO customer(id, name, email, password, role) VALUES ('${ids[1]}', 'John Doe Manager', 'example@example.com', '${password}', 'manager')`
      ),
    ]);

    await connection.query(
      `INSERT INTO customer_association (customer_owner_id, customer_id) VALUES ('${ids[1]}', '${ids[0]}')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();

    await connection.close();
  });

  it("Should be able to find  all customers associeted with one manager ", async () => {
    const response = await request(app)
      .get(`/api/customers`)
      .set("Authorization", `Bearer ${token}`);


    expect(response.status).toBe(200);
    expect(response.body.owner).toBeTruthy();
    expect(response.body.owner.length).toBe(1);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.owner[0]).not.toHaveProperty("password");
  });

  it("Should be able to find  all customers associeted with one manager ", async () => {
    const response = await request(app)
      .get(`/api/customers`)

    expect(response.status).toBe(401);
  });
});
