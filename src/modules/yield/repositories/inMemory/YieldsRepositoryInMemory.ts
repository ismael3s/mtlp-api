import { Yield } from "@modules/yield/domain/Yield";
import { CreateYieldDTO } from "@modules/yield/dtos/CreateYieldDTO";
import { IYieldsRepository } from "../IYieldsRepository";

class YieldsRepositoryInMemory implements IYieldsRepository {
  private yields: Yield[] = [];
  
  async save({ quotaId, percentage }: CreateYieldDTO): Promise<Yield> {
    const yield_ = new Yield();

    Object.assign(yield_, {
        quotaId,
        percentage,
    });

    yield_.validate();

    this.yields.push(yield_);

    return yield_;
  }

  async findByQuotaId(quotaId: string): Promise<Yield[]> {
    return this.yields.filter(yield_ => yield_.quotaId === quotaId);
  }
}

export { YieldsRepositoryInMemory };
