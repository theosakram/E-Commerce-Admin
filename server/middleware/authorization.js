const { Category, Product } = require("../models");

async function authorProduct(req, res, next) {
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

async function authorCategory(req, res, next) {
  let { name } = req.params;
  let { role } = req.data;

  try {
    const category = await Category.findOne({
      where: {
        name,
      },
    });
    if (!category) throw { status: 400, msg: "Category not found" };
    else if (role === "admin") next();
    else throw { status: 403, msg: "Unauthorized" };
  } catch (err) {
    next(err);
  }
}

module.exports = { authorProduct, authorCategory };
