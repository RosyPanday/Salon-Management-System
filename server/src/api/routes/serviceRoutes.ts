import { Router } from "express";
import { ServiceController } from "../controllers/serviceController.js";

const serviceRoutes = Router();

serviceRoutes.post("/", ServiceController.addService);

serviceRoutes.get("/", ServiceController.viewService);
serviceRoutes.get("/get-single-service/:id", ServiceController.viewService);
serviceRoutes.put("/:id", ServiceController.editService);
serviceRoutes.post("/:id", ServiceController.deleteService);
export default serviceRoutes;
