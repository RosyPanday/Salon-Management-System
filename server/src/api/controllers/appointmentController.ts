import type { AppointmentStatusEnum } from "#src/interfaces/appointmentInterface.js";
import { AppointmentService } from "#src/services/appointmentService.js";
import type { NextFunction, Request, Response } from "express";

export class AppointmentController {
  public static addAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {
        customerName,
        customerPhone,
        serviceId,
        appointmentDate,
        appointmentTime,
        notes,
      } = req.body;
      await new AppointmentService().addAppointment({
        customerName,
        customerPhone,
        serviceId,
        appointmentDate,
        appointmentTime,
        notes,
      });
      res.status(201).json({ message: "Appointment successfully created" });
    } catch (error) {
      if(error instanceof Error){
        res.status(500).json({ message: error.message });
      }
    }
  };

  public static viewAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { status } = req.query;
      const appointments = await new AppointmentService().getAppointments(status as AppointmentStatusEnum);
      res.status(200).json({ appointments });
    } catch (error) {
      if(error instanceof Error){
        res.status(404).json({ message: error.message });
      }
    }
  };

 
  public static editAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const appointmentData = req.body;
      const [updatedCount] = await new AppointmentService().editAppointment(
        id,
        appointmentData,
      );
      res.status(200).json({
        message: updatedCount > 0 ? "Appointment successfully updated" : "Appointment not found",
      });
    } catch (error) {
      if(error instanceof Error){
        res.status(404).json({ message: error.message });
      }
    }
  };

  public static deleteAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const deletedCount = await new AppointmentService().deleteAppointment(
        Number(req.params.id),
      );
      res.status(200).json({
        message: deletedCount > 0 ? "Appointment successfully deleted" : "Appointment not found",
      });
    } catch (error) {
      if(error instanceof Error){
        res.status(404).json({ message: error.message });
      }
    }
  };
}