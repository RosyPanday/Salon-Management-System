import { Router } from "express";
import { ServiceController } from "../controllers/serviceController.js";

const serviceRoutes = Router();

serviceRoutes.post(
  "/add-service",
  ServiceController.addService
);

serviceRoutes.post(
  "/view-service",
  ServiceController.viewService
);
serviceRoutes.post(
  "/delete-service",
  ServiceController.deleteService
);
serviceRoutes.post(
  "/edit-service",
  ServiceController.editService
);
export default serviceRoutes;