import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { Quota } from "@modules/yield/domain/Quota";
import { IQuotasRepository } from "@modules/yield/repositories/IQuotasRepository";
import { inject, injectable } from "tsyringe";
import { FindQuotasErrors } from "./FindQuotasByManagerErrors";

@injectable()
class FindQuotasByManagerUseCase {
  constructor(
    @inject("CustomersRepository")
    private readonly customersRepository: ICustomersRepository,
    @inject("QuotasRepository")
    private readonly quotasRepository: IQuotasRepository
  ) {}

  async execute(managerId: string): Promise<Quota[]> {
    const customerExists = await this.customersRepository.findById(managerId);

    if (!customerExists) {
      throw new FindQuotasErrors.CustomerNotFound();
    }

    let quotas: Quota[] = [];

    const quotasDB = await this.quotasRepository.findByManagerId(managerId);

    quotas = quotasDB.map((quota) => {
      const quotaDomain = new Quota();

      Object.assign(quotaDomain, quota);

      return quotaDomain;
    });

    return quotas;
  }
}

export { FindQuotasByManagerUseCase };
