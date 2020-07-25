const CommandCenter = require("../controller/CommandCenter");

const route = require("express").Router();
const { authorCategory } = require("../middleware/authorization");

route.get("/", CommandCenter.getCategory);
route.post("/", CommandCenter.addCategory);
route.put("/:id", authorCategory, CommandCenter.editCategory);
route.delete("/:id", authorCategory, CommandCenter.deleteCategory);

module.exports = route;
