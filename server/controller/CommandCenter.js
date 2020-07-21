const { Product, User } = require("../models");
const { compare } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");

class CommandCenter {
  // USER
  static async register(req, res, next) {
    let { name, email, role, password } = req.body;
    try {
      const user = await User.create({ name, email, role, password });
      res.status(201).json({ msg: "User registered successfully", user });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        if (compare(password, user.password)) {
          const access_token = createToken({
            id: user.id,
            email: user.email,
            role: user.role,
          });
          res.status(200).json({
            msg: "User logged in successfully",
            access_token,
            name: user.name,
            id: user.id,
          });
        } else throw { status: 400, msg: "Wrong email/ password" };
      } else throw { status: 400, msg: "User not found" };
    } catch (err) {
      next(err);
    }
  }

  //PRODUCTS
  static async getProduct(req, res, next) {
    try {
      const product = await Product.findAll();
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    try {
      let { name, image_url, category, price, stock } = req.body;
      const product = await Product.create({
        name,
        image_url,
        category,
        price,
        stock,
      });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async editProduct(req, res, next) {
    let { id } = req.params;
    let { name, image_url, category, price, stock } = req.body;
    try {
      let edited = {
        name,
        image_url,
        category,
        price,
        stock,
      };
      const updating = await Product.update(edited, {
        where: {
          id,
        },
      });

      const product = await Product.findByPk(id);
      res.status(200).json({ msg: "Product edited successfully", product });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    let { id } = req.params;
    try {
      const deleted = await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ msg: "Product deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CommandCenter;
