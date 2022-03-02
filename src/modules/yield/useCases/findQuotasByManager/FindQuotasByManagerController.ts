import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindQuotasByManagerUseCase } from "./FindQuotasByManagerUseCase";

class FindQuotasByManagerController {
  async handler(request: Request, response: Response) {
    const { id } = request.customer || {};

    const findQuotasByManagerUseCase = container.resolve(FindQuotasByManagerUseCase);

    const quotas = await findQuotasByManagerUseCase.execute(id);

    return response.status(200).json(quotas);
  }
}

export { FindQuotasByManagerController };
