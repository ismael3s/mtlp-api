import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {
  async handler(request: Request, response: Response) {
    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);
    const { name, email, password } = request.body;

    const customer = await createCustomerUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(customer);
  }
}

export { CreateCustomerController };
