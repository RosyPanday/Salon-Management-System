import { Router } from "express";
import serviceRoutes from "./serviceRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";

const routes = Router();

routes.use("/services", serviceRoutes);
routes.use("/appointments", appointmentRoutes);


export default routes;