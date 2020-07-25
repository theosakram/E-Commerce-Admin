const route = require("express").Router();
const authentic = require("../middleware/authentication");
const categories = require("./category");
const products = require("./products");
const users = require("./users");

route.use("/users", users);

route.use(authentic);
route.use("/categories", categories);
route.use("/products", products);

module.exports = route;
