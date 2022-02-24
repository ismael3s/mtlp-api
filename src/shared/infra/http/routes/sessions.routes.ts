import { Router } from "express";
import { AuthenticateCustomerController } from "@modules/customer/useCases/authenticateCustomer/AuthenticateCustomerController";
const sessionsRoutes = Router();

const authenticateCustomerController = new AuthenticateCustomerController();

sessionsRoutes.post("/", authenticateCustomerController.handler);

export { sessionsRoutes };
