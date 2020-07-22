"use strict";
const { hash } = require("../helper/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let admin = {
      name: "Admin",
      email: "admin@admin.admin",
      password: hash("admin"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert("Users", [admin], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
