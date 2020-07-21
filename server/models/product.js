"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
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
        unique: {
          args: true,
          msg: "Name is already taken",
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Image URL is required",
          },
          notNull: true,
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Category is required",
          },
          notNull: true,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Price must be numbers",
          },
          notEmpty: {
            args: true,
            msg: "You must give your product a price",
          },
          notNull: true,
          min: {
            args: 1,
            msg: "Price cannot be lesser than one",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Stock is required to sell things",
          },
          isInt: {
            msg: "Stock must be numbers",
          },
          notNull: true,
          isGreaterThanZero(value) {
            if (value < 0) throw new Error("Stock cannot be lesser than zero");
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
