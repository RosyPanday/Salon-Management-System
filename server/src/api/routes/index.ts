import { Router } from "express";
import serviceRoutes from "./serviceRoutes.js";

const routes = Router();

routes.use("/services", serviceRoutes);

export default routes;