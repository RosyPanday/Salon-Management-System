import { SalonService } from "#src/services/salonService.js";
import type { NextFunction, Request, Response } from "express";

export class ServiceController {
  public static addService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { serviceName, price, duration } = req.body;
      await new SalonService().addService({ serviceName, duration, price });
      res.status(201).json({ message: "Service successfully created" });
    } catch (error) {
      if(error instanceof Error){
        res.status(500).json({ message: error.message });
      }
    }
  };

  public static viewService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const services = await new SalonService().getServices();
      res.status(200).json({ services });
    } catch (error) {
      if(error instanceof Error){
        res.status(404).json({ message: error.message });
      }
    }
  };

    public static viewSingleService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const service = await new SalonService().getSingleService(Number(req.params.id));
      res.status(200).json({ service });
    } catch (error) {
      if(error instanceof Error){
        res.status(404).json({ message: error.message });
      }
    }
  }; 

  public static editService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id, ...serviceData } = req.body;
      const service = await new SalonService().editService(
        Number(req.body.id),
        serviceData,
      );
      res.status(200).json({ service });
    } catch (error) {
      if(error instanceof Error){
        res.status(404).json({ message: error.message });
      }
    }
  };

  public static deleteService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const deleted = await new SalonService().deleteService(
        Number(req.body.id),
      );
      res.status(200).json({ message: "Service successfully deleted" });
    } catch (error) {
      if(error instanceof Error){
        res.status(404).json({ message: error.message });
      }
    }
  };
}