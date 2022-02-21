import { Yield } from "../domain/Yield";
import { CreateYieldDTO } from "../dtos/CreateYieldDTO";

interface IYieldsRepository {
    save(createYieldDTO: CreateYieldDTO): Promise<Yield>;
    findByQuotaId(quotaId: string): Promise<Yield[]>;
}

export { IYieldsRepository };