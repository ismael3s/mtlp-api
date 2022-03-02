import { Customer } from "@modules/customer/domain/Customer";
import { CustomerMap } from "@modules/customer/mappers/CustomerMap";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAssociatedCustomersUseCase {
    constructor(
        @inject("CustomersRepository")
        private readonly customersRepository: ICustomersRepository,
    ) {}

    async execute(customerId: string): Promise<Customer> {
        const customersDb = await this.customersRepository.findAssocietedCustomers(customerId);

        let customers = CustomerMap.fromDb(customersDb);    

        customers.owner = customersDb.owner.map(customer => CustomerMap.fromDb(customer));

        return customers;
    }   
}

export { FindAssociatedCustomersUseCase };
