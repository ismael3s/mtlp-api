import { Router } from "express";
import { CreateQuotaController } from "@modules/yield/useCases/createQuota/CreateQuotaController";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware";

const quotasManagerRoutes = Router();

const createQuotaController = new CreateQuotaController();

quotasManagerRoutes.post("/", authorizationMiddleware, createQuotaController.handler);

export { quotasManagerRoutes };
