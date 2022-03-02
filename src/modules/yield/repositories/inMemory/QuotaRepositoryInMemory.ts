import { CreateQuotaDTO } from "@modules/yield/dtos/CreateQuotaDTO";
import { Quota } from "@modules/yield/infra/typeorm/entities/Quota";
import { IQuotasRepository } from "../IQuotasRepository";

class QuotasRepositoryInMemory implements IQuotasRepository {
  private quotas: Quota[] = [];

  async save({
    customerId,
    value,
    managerId,
  }: CreateQuotaDTO): Promise<Quota> {
    const quota = new Quota();

    Object.assign(quota, { customerId, value, managerId });

    this.quotas.push(quota);

    return quota;
  }

  async findByCustomerId(customerId: string): Promise<Quota[]> {
    const quotas = this.quotas.filter(
      (quota) => quota.customerId === customerId
    );

    return quotas;
  }

  async findByManagerId(managerId: string): Promise<Quota[]> {
    const quotas = this.quotas.filter((quota) => quota.managerId === managerId);

    return quotas;
  }

  async findById(id: string): Promise<Quota | undefined> {
    const quota = this.quotas.find((quota) => quota.id === id);

    return quota;
  }

  async delete(id: string): Promise<void> {
    this.quotas = this.quotas.filter((quota) => quota.id !== id);

    return;
  }
}

export { QuotasRepositoryInMemory };
