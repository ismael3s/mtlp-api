import { CreateQuotaDTO } from "../dtos/CreateQuotaDTO";
import { Quota } from "../infra/typeorm/entities/Quota";

interface IQuotasRepository {
  save({ customerId, managerId, value }: CreateQuotaDTO): Promise<Quota>;
  findByCustomerId(customerId: string): Promise<Quota[]>;
  findByManagerId(managerId: string): Promise<Quota[]>
  findById(id: string): Promise<Quota | undefined>;
  delete(id: string): Promise<void>;
}


export { IQuotasRepository };
