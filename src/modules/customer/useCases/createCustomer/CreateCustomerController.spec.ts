import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Create Customer Contrller", () => {
  it("Should be able to create a customer ", async () => {
    const response = await request(app).post("/customers").send({
      name: "John Doe",
      email: "jhon@example.com",
      password: "password",
    });
  });
});
