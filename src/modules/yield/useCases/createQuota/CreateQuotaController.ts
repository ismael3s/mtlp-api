import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateQuotaUseCase } from "./CreateQuotaUseCase";

class CreateQuotaController {
  async handler(request: Request, response: Response) {
    const { id: managerId, role } = request.customer;
    const { customerId, value } = request.body;

    const createQuotaUseCase = container.resolve(CreateQuotaUseCase);

    const quota = await createQuotaUseCase.execute({
      managerId,
      customerId,
      value,
    });

    return response.status(201).json(quota);
  }
}

export { CreateQuotaController };
