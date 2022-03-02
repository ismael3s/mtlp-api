import { Router } from "express";
import { managerRouter } from "./managersRoutes";
import { sessionsRoutes } from "./sessions.routes";

const router = Router();

router.use(managerRouter)
router.use("/api/sessions", sessionsRoutes);

export { router };

