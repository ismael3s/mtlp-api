import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { inject, injectable } from "tsyringe";
import { Quota } from "../../domain/Quota";
import { CreateQuotaDTO } from "../../dtos/CreateQuotaDTO";
import { IQuotasRepository } from "../../repositories/IQuotasRepository";
import { CreateQuotaErrors } from "./CreateQuotaErrors";

@injectable()
class CreateQuotaUseCase {
  constructor(
    @inject("QuotasRepository")
    private readonly quotasRepository: IQuotasRepository,
    @inject("CustomersRepository")
    private readonly customersRepository: ICustomersRepository
  ) {}

  async execute({
    customerId,
    value,
    managerId,
  }: CreateQuotaDTO): Promise<Quota> {
    const quota = new Quota();


    Object.assign(quota, { customerId, value, managerId });

    quota.validate();
    
    const customerExists = await this.customersRepository.findById(customerId);

    if (!customerExists) {
      throw new CreateQuotaErrors.CustomerNotFound();
    }

    const quotaDb = await this.quotasRepository.save({ managerId, customerId, value });

    Object.assign(quota, quotaDb)

    return quota;
  }
}

export { CreateQuotaUseCase };
