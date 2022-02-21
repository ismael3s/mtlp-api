import { Yield } from "@modules/yield/domain/Yield";
import { IQuotasRepository } from "@modules/yield/repositories/IQuotasRepository";
import { IYieldsRepository } from "@modules/yield/repositories/IYieldsRepository";
import { CreateYieldErrors } from "./CreateYieldErrors";

class CreateYieldUseCase {
  constructor(
    private readonly quotasRepository: IQuotasRepository,
    private readonly yieldsRepository: IYieldsRepository
  ) {}

  async execute(quotaId: string, percentage: number): Promise<Yield> {
    const quotaExists = await this.quotasRepository.findById(quotaId);

    if (!quotaExists) {
      throw new CreateYieldErrors.QuotaNotFound();
    }

    const yield_ = await this.yieldsRepository.save({ quotaId, percentage });

    return yield_;
  }
}

export { CreateYieldUseCase };
