import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAssociatedCustomersUseCase } from "./FindAssociatedCustomersUseCase";


class FindAssociatedCustomersController {
    async handler(request: Request, response: Response) {
        const { id } = request.customer;

        const findAssociatedCustomersUseCase = container.resolve(FindAssociatedCustomersUseCase)

        const customers = await findAssociatedCustomersUseCase.execute(id);


        return response.json(customers);
    }
}

export { FindAssociatedCustomersController };
