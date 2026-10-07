import "multer";
import * as Sequelize from "sequelize";

export interface ServiceInterface {
  id?: number;
  serviceName: string;
  price: number;
  duration: number;
}

export interface ServiceModelInterface
  extends
    Sequelize.Model<ServiceInterface, Partial<ServiceInterface>>,
    ServiceInterface {}