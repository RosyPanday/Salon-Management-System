import type { NextFunction, Request, Response } from "express";

export class ServiceController {
  public static addService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {};
}
