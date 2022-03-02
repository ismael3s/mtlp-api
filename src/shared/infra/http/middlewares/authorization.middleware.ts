import { CustomersRepository } from "@modules/customer/infra/typeorm/repositories/CustomersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";

interface ISub {
  id: string;
}

const authorizationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  const customersRepository = new CustomersRepository();

  if (!authorization) {
    return response.status(401).json({
      message: "Unthenticated",
    });
  }

  const [, token] = authorization.split(" ");

  const { id } = decode(token) as ISub;

  const customer = await customersRepository.findById(id);

  if (!customer) {
    throw new AppError("Customer not found", 401);
  }

  if (customer.role !== "manager") {
    throw new AppError("Unauthorized", 401);
  }

  request.customer = customer;

  next();
};

export { authorizationMiddleware };
