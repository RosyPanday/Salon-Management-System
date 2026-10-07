import { Router } from "express";
import { ServiceController } from "../controllers/serviceController.js";

const serviceRoutes = Router();

serviceRoutes.post("/", ServiceController.addService);

serviceRoutes.get("/", ServiceController.viewService);
serviceRoutes.get("/get-single-service/:id", ServiceController.viewService);
serviceRoutes.post("/edit-service/:id", ServiceController.editService);
serviceRoutes.post("/delete-service", ServiceController.deleteService);
export default serviceRoutes;