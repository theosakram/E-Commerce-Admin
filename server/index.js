require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "test";
const router = require("./router");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const { Product } = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler);

// app.listen(port, (_) => {
//   console.log(`Listening on port ${port}`);
//   console.table({ port, NODE_ENV });
// });

module.exports = app;
