const route = require("express").Router();
const CommandCenter = require("../controller/CommandCenter.js");

route.post("/login", CommandCenter.login);
route.post("/register", CommandCenter.register);

module.exports = route;
