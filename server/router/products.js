const route = require("express").Router();
const CommandCenter = require("../controller/CommandCenter.js");
const { authorProduct } = require("../middleware/authorization");

route.get("/", CommandCenter.getProduct);
route.get("/search/:name", CommandCenter.getProductByCategory);
route.post("/", CommandCenter.addProduct);
route.put("/:id", authorProduct, CommandCenter.editProduct);
route.delete("/:id", authorProduct, CommandCenter.deleteProduct);

module.exports = route;
