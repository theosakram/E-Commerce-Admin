require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./router");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler);

app.listen(port, (_) => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
