import * as Sequelize from "sequelize";

export enum AppointmentStatusEnum {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export interface AppointmentAttributes {
  id?: number;
  customerName: string;
  customerPhone: string;
  serviceId: number;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string | null;
  status?: AppointmentStatusEnum;
}

export interface AppointmentModelInterface
  extends
    Sequelize.Model<AppointmentAttributes, Partial<AppointmentAttributes>>,
    AppointmentAttributes {}
