import * as Sequelize from "sequelize";

import { Database } from "#src/database/connection.js";
import type { ServiceModelInterface } from "#src/interfaces/serviceInterface.js";

const sequelize = Database.sequelize;
const Service = sequelize.define<ServiceModelInterface>(
  "services",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "service_name"
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    duration: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

export default Service;