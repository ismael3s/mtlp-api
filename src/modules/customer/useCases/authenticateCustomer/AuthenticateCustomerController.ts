import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";

class AuthenticateCustomerController {
  async handler(request: Request, response: Response) {
    const authenticateCustomerUseCase = container.resolve(
      AuthenticateCustomerUseCase
    );
    const { email, password } = request.body;

    const result = await authenticateCustomerUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(result);
  }
}

export { AuthenticateCustomerController };
