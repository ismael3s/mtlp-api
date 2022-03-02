import { Quota } from "../domain/Quota";
import { CreateQuotaDTO } from "../dtos/CreateQuotaDTO";

interface IQuotasRepository {
  save({ customerId, customerOwnerId, value }: CreateQuotaDTO): Promise<Quota>;
  findByCustomerId(customerId: string): Promise<Quota[]>;
  findById(id: string): Promise<Quota | undefined>;
  delete(id: string): Promise<void>;
}


export { IQuotasRepository };
