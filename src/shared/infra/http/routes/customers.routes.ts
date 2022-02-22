import { CreateCustomerController } from "@modules/customer/useCases/createCustomer/CreateCustomerController";
import { Router } from "express";

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController();

customerRoutes.post("/", createCustomerController.handler);

export { customerRoutes };
