import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {
  async handler(request: Request, response: Response) {
    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);
    const { name, email, password } = request.body;

    const { id, role } = request.customer;

    const customer = await createCustomerUseCase.execute({
      name: name as string,
      email: email as string,
      password: password as string,
      ownerId: id,
      ownerRole: role,
    });

    return response.status(201).json(customer);
  }
}

export { CreateCustomerController };
