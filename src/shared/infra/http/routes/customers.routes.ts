import { CreateCustomerController } from "@modules/customer/useCases/createCustomer/CreateCustomerController";
import { FindAssociatedCustomersController } from "@modules/customer/useCases/findAssociatedCustomers/FindAssociatedCustomersController";
import { Router } from "express";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController();
const findAssociatedCustomers = new FindAssociatedCustomersController();

customerRoutes.use(authorizationMiddleware)

customerRoutes.post("/", createCustomerController.handler);

customerRoutes.get("/", findAssociatedCustomers.handler);

export { customerRoutes };
