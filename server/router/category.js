const route = require("express").Router();
const CommandCenter = require("../controller/CommandCenter");
const { authorCategory } = require("../middleware/authorization");

route.get("/", CommandCenter.getCategory);
route.post("/", CommandCenter.addCategory);
route.put("/:name", authorCategory, CommandCenter.editCategory);
route.delete("/:name", authorCategory, CommandCenter.deleteCategory);

module.exports = route;
