const route = require("express").Router();
const authentic = require("../middleware/authentication");
const products = require("./products");
const users = require("./users");

route.use("/users", users);

route.use(authentic);
route.use("/products", products);

module.exports = route;
