import * as Sequelize from "sequelize";

import { Database } from "#src/database/connection.js";

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

const sequelize = Database.sequelize;
const Appointment = sequelize.define<AppointmentModelInterface>(
  "appointments",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "customer_name",
    },
    customerPhone: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "customer_phone",
    },
    serviceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "service_id",
      references: {
        model: "services",
        key: "id",
      },
    },
    appointmentDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: "appointment_date",
    },
    appointmentTime: {
      type: Sequelize.TIME,
      allowNull: false,
      field: "appointment_time",
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    underscored: true,
  },
);

export default Appointment;
