const route = require("express").Router();
const CommandCenter = require("../controller/CommandCenter.js");
const author = require("../middleware/authorization");

route.get("/", CommandCenter.getProduct);
route.post("/", CommandCenter.addProduct);
route.put("/:id", author, CommandCenter.editProduct);
route.delete("/:id", author, CommandCenter.deleteProduct);

module.exports = route;
