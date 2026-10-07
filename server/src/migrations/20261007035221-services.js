"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      service_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      // created_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // updated_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // deleted_at: {
      //   type: Sequelize.DATE,
      //   allowNull: true,
      // },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("services");
  },
};