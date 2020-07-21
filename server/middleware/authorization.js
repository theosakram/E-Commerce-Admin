const { Product } = require("../models");

async function author(req, res, next) {
  let { id } = req.params;
  let { role } = req.data;
  try {
    const product = await Product.findByPk(id);
    if (!product) next(err);
    else if (role == "admin") next();
    else next(err);
  } catch (err) {
    next(err);
  }
}

module.exports = author;
