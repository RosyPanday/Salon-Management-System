import * as Sequelize from "sequelize";

import { Database } from "#src/database/connection.js";

const sequelize = Database.sequelize;
const Service = sequelize.define<ServiceModelInterface>(
  "products",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
   
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

export default Service;