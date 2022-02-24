import { Router } from "express";
import { customerRoutes } from "./customers.routes";
import { sessionsRoutes } from "./sessions.routes";

const router = Router();

router.use("/api/customers", customerRoutes);
router.use("/api/sessions", sessionsRoutes);

export { router };
