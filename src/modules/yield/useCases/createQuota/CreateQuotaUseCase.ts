import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { Quota } from "../../domain/Quota";
import { CreateQuotaDTO } from "../../dtos/CreateQuotaDTO";
import { IQuotasRepository } from "../../repositories/IQuotasRepository";
import { CreateQuotaErrors } from "./CreateQuotaErrors";

class CreateQuotaUseCase {
  constructor(
    private readonly quotasRepository: IQuotasRepository,
    private readonly customersRepository: ICustomersRepository
  ) {}

  async execute({
    customerId,
    value,
    customerOwnerId,
  }: CreateQuotaDTO): Promise<Quota> {
    const quota = new Quota();

    Object.assign(quota, { customerId, value, customerOwnerId });

    quota.validate();
    
    const customerExists = await this.customersRepository.findById(customerId);

    if (!customerExists) {
      throw new CreateQuotaErrors.CustomerNotFound();
    }

    const quotaDb = await this.quotasRepository.save({ customerOwnerId, customerId, value });

    return quotaDb;
  }
}

export { CreateQuotaUseCase };
