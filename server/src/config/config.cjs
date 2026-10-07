import { connectionString } from "./index.js";

module.exports = {
  development: {
    url: connectionString, 
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  },
  production: {
    url: connectionString,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};