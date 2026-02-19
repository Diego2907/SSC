import { Router } from "express";
import domicilioRoutes from "./domicilio.route.js";
// import technicalUserRoutes from "./technical-user.route.js";

const router = Router();
router.use("/domicilio", domicilioRoutes);
// router.use("/technical", technicalUserRoutes);

export default router;
