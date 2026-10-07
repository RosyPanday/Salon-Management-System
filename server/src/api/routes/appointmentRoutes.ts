import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController.js";

const appointmentRoutes = Router();

appointmentRoutes.post("/", AppointmentController.addAppointment);

appointmentRoutes.get("/", AppointmentController.viewAppointment);
appointmentRoutes.patch("/:id/status", AppointmentController.editAppointment);
appointmentRoutes.delete("/:id", AppointmentController.deleteAppointment);

export default appointmentRoutes;
