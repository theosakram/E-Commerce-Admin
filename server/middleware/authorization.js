const { Product } = require("../models");

async function author(req, res, next) {
  let { id } = req.params;
  let { role } = req.data;
  try {
    const product = await Product.findByPk(id);
    if (!product) throw { status: 400, msg: "Product not found" };
    else if (role == "admin") next();
    else throw { status: 403, msg: "Unauthorized" };
  } catch (err) {
    next(err);
  }
}

module.exports = author;
