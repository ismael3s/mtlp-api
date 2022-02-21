import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { Quota } from "@modules/yield/domain/Quota";
import { IQuotasRepository } from "@modules/yield/repositories/IQuotasRepository";
import { FindQuotasErrors } from "./FindQuotasErrors";

class FindQuotasUseCase {
  constructor(
    private readonly customersRepository: ICustomersRepository,
    private readonly quotasRepository: IQuotasRepository
  ) {}

  async execute(customerId: string): Promise<Quota[]> {
    const customerExists = await this.customersRepository.findById(customerId);
    
    if (!customerExists) {
      throw new FindQuotasErrors.CustomerNotFound();
    }

    const quotas = await this.quotasRepository.findByCustomerId(customerId);

    return quotas;
  }
}

export { FindQuotasUseCase };
