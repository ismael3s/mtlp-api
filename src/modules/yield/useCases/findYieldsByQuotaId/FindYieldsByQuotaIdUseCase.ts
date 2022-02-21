import { IYieldsRepository } from "@modules/yield/repositories/IYieldsRepository";

class FindYieldsByQuotaIdUseCase {
    constructor(
        private readonly yieldsRepository: IYieldsRepository
    ) {}
    async execute(quotaId: string) {
        const yields_ = await this.yieldsRepository.findByQuotaId(quotaId);

        return yields_;
    }
}

export { FindYieldsByQuotaIdUseCase };
