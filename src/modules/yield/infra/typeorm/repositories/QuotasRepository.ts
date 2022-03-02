import { CreateQuotaDTO } from "@modules/yield/dtos/CreateQuotaDTO";
import { IQuotasRepository } from "@modules/yield/repositories/IQuotasRepository";
import { getRepository, Repository } from "typeorm";
import { Quota } from "../entities/Quota";

class QuotasRepository implements IQuotasRepository {

    private repository: Repository<Quota>;

    constructor() {
        this.repository = getRepository(Quota)
    }

    public async save({ customerId, managerId, value }: CreateQuotaDTO): Promise<Quota> {
        const quota = this.repository.create({ customerId, managerId, value });

        await this.repository.save(quota);

        return quota;
    }
    
    public async findByCustomerId(customerId: string): Promise<Quota[]> {
        return this.repository.find({ where: { customerId } });
    }

    public async findByManagerId(managerId: string): Promise<Quota[]> {
        return this.repository.find({ where: { managerId } });
    }

    public async findById(id: string): Promise<Quota> {
        return this.repository.findOne({ where: { id } });
    }

    public async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export { QuotasRepository}