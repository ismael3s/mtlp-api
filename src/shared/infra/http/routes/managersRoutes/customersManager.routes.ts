import { Router } from "express";
import { CreateCustomerController } from "@modules/customer/useCases/createCustomer/CreateCustomerController";
import { FindAssociatedCustomersController } from "@modules/customer/useCases/findAssociatedCustomers/FindAssociatedCustomersController";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware";

const customersManagerRoutes = Router();

const createCustomerController = new CreateCustomerController();
const findAssociatedCustomers = new FindAssociatedCustomersController();

customersManagerRoutes.use(authorizationMiddleware)

customersManagerRoutes.post("/", createCustomerController.handler);

customersManagerRoutes.get("/", findAssociatedCustomers.handler);

export { customersManagerRoutes };
