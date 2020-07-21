"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let admin = {
      name: "Admin",
      email: "admin@admin.admin",
      password: "admin",
      role: "admin",
    };

    await queryInterface.bulkInsert("Users", admin, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
