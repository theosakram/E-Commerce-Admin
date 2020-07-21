"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required",
          },
          notNull: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email is already registered",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          notNull: true,
          isEmail: {
            args: true,
            msg: "Wrong email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
          notNull: true,
        },
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user) => {
          user.password = hash(user.password);
          if (user.role === "" || user.role == null || user.role == undefined) {
            user.role = "user";
          }
        },
      },
      modelName: "User",
    }
  );
  return User;
};
