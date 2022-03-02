import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { Quota } from "@modules/yield/domain/Quota";
import { IQuotasRepository } from "@modules/yield/repositories/IQuotasRepository";
import { FindQuotasErrors } from "./FindQuotasByManagerErrors";

class FindQuotasByManagerUseCase {
  constructor(
    private readonly customersRepository: ICustomersRepository,
    private readonly quotasRepository: IQuotasRepository
  ) {}

  async execute(managerId: string): Promise<Quota[]> {
    const customerExists = await this.customersRepository.findById(managerId);

    if (!customerExists) {
      throw new FindQuotasErrors.CustomerNotFound();
    }

    let quotas: Quota[] = [];

    const quotasDB = await this.quotasRepository.findByManagerId(managerId);

    quotas = quotasDB.map((quota, index) => {
      const quotaDomain = new Quota();

      Object.assign(quotaDomain, quota);

      return quotaDomain;
    });

    return quotas;
  }
}

export { FindQuotasByManagerUseCase };
