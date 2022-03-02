import { Router } from "express";
import { customersManagerRoutes } from "./customersManager.routes";
import { quotasManagerRoutes } from "./quotasManager.routes";

const managerRouter = Router();

managerRouter.use("/api/manager/customers", customersManagerRoutes);
managerRouter.use("/api/manager/quotas", quotasManagerRoutes);

export { managerRouter };

