import { Router } from "express";
import { CreateQuotaController } from "@modules/yield/useCases/createQuota/CreateQuotaController";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware";
import { FindQuotasByManagerController } from "@modules/yield/useCases/findQuotasByManager/FindQuotasByManagerController";

const quotasManagerRoutes = Router();

const createQuotaController = new CreateQuotaController();
const findQuotasByManager = new FindQuotasByManagerController()

quotasManagerRoutes.post("/", authorizationMiddleware, createQuotaController.handler);
quotasManagerRoutes.get("/", authorizationMiddleware, findQuotasByManager.handler);

export { quotasManagerRoutes };
