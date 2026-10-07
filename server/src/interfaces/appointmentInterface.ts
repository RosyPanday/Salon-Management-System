import * as Sequelize from "sequelize";

export interface AppointmentAttributes {
  id?: number;
  customerName: string;
  customerPhone: string;
  serviceId: number;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string | null;
}

export interface AppointmentModelInterface
  extends Sequelize.Model<AppointmentAttributes, Partial<AppointmentAttributes>>,
    AppointmentAttributes {}