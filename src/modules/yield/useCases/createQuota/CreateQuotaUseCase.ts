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

  async execute({ customerId, value }: CreateQuotaDTO): Promise<Quota> {
    const customerExists = await this.customersRepository.findById(customerId);

    if (!customerExists) {
      throw new CreateQuotaErrors.CustomerNotFound();
    }

    const quota = await this.quotasRepository.save({ customerId, value });

    return quota;
  }
}

export { CreateQuotaUseCase };
