import * as Sequelize from "sequelize";

export enum AppointmentStatusEnum {
  Pending = "pending",
  Confirmed = "confirmed",
  Completed = "completed",
  Cancelled = "cancelled",
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
