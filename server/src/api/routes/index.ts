import { Router } from "express";
import productRoutes from "./serviceRoutes.js";

const routes = Router();

routes.use("/product", productRoutes);

export default routes;