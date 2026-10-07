import { Router } from "express";
import { ServiceController } from "../controllers/serviceController.js";

const serviceRoutes = Router();

serviceRoutes.post("/add-service", ServiceController.addService);

serviceRoutes.get("/view-service", ServiceController.viewService);
serviceRoutes.get("/get-single-service/:id", ServiceController.viewService);
serviceRoutes.post("/edit-service/:id", ServiceController.editService);
serviceRoutes.post("/delete-service", ServiceController.deleteService);
export default serviceRoutes;